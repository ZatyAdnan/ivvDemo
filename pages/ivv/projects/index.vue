<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

definePageMeta({
  title: "Projek",
  middleware: ["auth"],
  breadcrumb: [
    {
      name: "Projek",
      type: "current",
    },
  ],
});

const { $swal } = useNuxtApp();

const projectData = ref([]);
const loading = ref(false);

// Function to fetch projects
async function fetchProjects() {
  loading.value = true;
  try {
    const response = await $fetch("/api/projects");
    if (response.statusCode === 200) {
      projectData.value = response.data;
    } else if (response.statusCode === 401) {
      $swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You are not authorized to view projects",
      });
      // Redirect to login if needed
      // navigateTo('/login');
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    $swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "Failed to load projects",
    });
  } finally {
    loading.value = false;
  }
}

// Call fetchProjects when component mounts
onMounted(() => {
  fetchProjects();
});

const handleDelete = async (projectId) => {
  const result = await $swal.fire({
    title: "Adakah anda pasti?",
    text: "Anda tidak akan dapat mengembalikannya!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, padamkannya!",
  });

  if (result.isConfirmed) {
    try {
      // Simulasi kelewatan panggilan API
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Keluarkan projek dari projectData
      projectData.value = projectData.value.filter(
        (project) => project.no !== projectId
      );

      $swal.fire("Dipadam!", "Projek telah dipadam.", "success");
    } catch (error) {
      $swal.fire("Ralat!", "Gagal memadam projek.", "error");
    }
  }
};

const navigateTo = (path) => {
  // Laksanakan logik navigasi
};
</script>

<template>
  <div class="space-y-4">
    <Breadcrumb />

    <!-- Bahagian Header -->
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-bold tracking-tight">Projek</h3>

      <NuxtLink :to="`/ivv/projects/add`">
        <rs-button variant="primary">
          <Icon name="material-symbols:add" class="mr-1"></Icon>
          Tambah Projek
        </rs-button>
      </NuxtLink>
    </div>

    <!-- Jadual Senarai Projek -->
    <rs-card class="px-0 py-4">
      <rs-table :data="projectData" :loading="loading" advanced>
        <template #action="{ value }">
          <div class="flex gap-2">
            <NuxtLink :to="value.action.view">
              <rs-button variant="primary">
                <Icon
                  name="material-symbols:visibility-outline-rounded"
                  class="w-4 h-4"
                />
              </rs-button>
            </NuxtLink>
            <!-- <rs-button variant="primary" @click="navigateTo(value.action.edit)">
                <Icon name="material-symbols:edit" class="w-4 h-4" />
              </rs-button>
              <rs-button variant="danger" @click="handleDelete(value.no)">
                <Icon name="material-symbols:delete" class="w-4 h-4" />
              </rs-button> -->
          </div>
        </template>
      </rs-table>
    </rs-card>
  </div>
</template>

<style scoped>
/* Tambah sebarang gaya tambahan di sini */
</style>
