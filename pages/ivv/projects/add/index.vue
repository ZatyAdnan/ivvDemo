<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useNuxtApp } from "#app";

definePageMeta({
  title: "Projek",
  middleware: ["auth"],
  breadcrumb: [
    {
      name: "Tambah Projek",
      type: "current",
    },
  ],
});

const router = useRouter();
const { $swal } = useNuxtApp();

// Refs for form options
const statusOptions = ref({});
const contractorOptions = ref({});
const loading = ref(false);

// Fetch lookup data
async function fetchLookupData() {
  try {
    const response = await $fetch("/api/lookup/projek_status");
    if (response.statusCode === 200) {
      statusOptions.value = response.data.reduce((acc, curr) => {
        acc[curr.lookupID] = curr.lookupValue;
        return acc;
      }, {});
    }
  } catch (error) {
    console.error("Error fetching status options:", error);
    $swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to load status options",
    });
  }
}

// Fetch contractors with formatted display
async function fetchContractors() {
  try {
    const response = await $fetch("/api/contractors");
    if (response.statusCode === 200) {
      contractorOptions.value = response.data.reduce((acc, curr) => {
        // Format: Company Name (Registration No.) - Grade - Category
        const label = `${curr.name} (${curr.registrationNo}) - ${curr.gradeName} - ${curr.categoryName}`;
        acc[curr.id] = label;
        return acc;
      }, {});
    }
  } catch (error) {
    console.error("Error fetching contractors:", error);
    $swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to load contractors",
    });
  }
}

const handleSubmit = async (formData) => {
  loading.value = true;
  try {
    const response = await $fetch("/api/projects", {
      method: "POST",
      body: {
        projectName: formData.projectName,
        projectCode: formData.projectCode,
        description: formData.description,
        contractor: formData.contractor,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        budget: formData.budget,
        projectManager: formData.projectManager,
        email: formData.email,
        phone: formData.phone,
      },
    });

    if (response.statusCode === 201) {
      await $swal.fire({
        icon: "success",
        title: "Success",
        text: "Project created successfully",
      });
      router.push("/ivv/projects");
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    $swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "Failed to create project",
    });
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  router.push("/ivv/projects");
};

// Fetch data when component mounts
onMounted(() => {
  fetchLookupData();
  fetchContractors();
});
</script>

<template>
  <div>
    <Breadcrumb />
    <div class="space-y-4">
      <rs-card class="px-4 py-4">
        <FormKit type="form" @submit="handleSubmit" :actions="false">
          <!-- Maklumat Asas Projek -->
          <div class="form-section">
            <h3>Maklumat Asas</h3>

            <FormKit
              type="text"
              name="projectName"
              label="Nama Projek"
              validation="required"
              placeholder="Masukkan nama projek"
            />

            <FormKit
              type="text"
              name="projectCode"
              label="Kod Projek"
              validation="required"
              placeholder="cth., PRJ-2024-001"
            />

            <FormKit
              type="textarea"
              name="description"
              label="Skop Projek"
              placeholder="Masukkan skop projek"
              rows="4"
            />
          </div>

          <!-- Butiran Projek -->
          <div class="form-section">
            <h3>Butiran Projek</h3>

            <FormKit
              type="select"
              name="contractor"
              label="Kontraktor"
              validation="required"
              placeholder="Pilih kontraktor"
              :options="contractorOptions"
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormKit
                type="date"
                name="startDate"
                label="Tarikh Mula"
                validation="required"
              />

              <FormKit
                type="date"
                name="endDate"
                label="Tarikh Jangka Siap"
                validation="required"
              />
            </div>

            <FormKit
              type="select"
              name="status"
              label="Status Projek"
              :options="statusOptions"
            />

            <FormKit
              type="number"
              name="budget"
              label="Bajet (MYR)"
              validation="min:0"
              step="0.01"
              placeholder="Masukkan bajet projek"
            />
          </div>

          <!-- Maklumat Perhubungan -->
          <div class="form-section">
            <h3>Maklumat Perhubungan</h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormKit
                type="text"
                name="projectManager"
                label="Pengurus Projek"
                validation="required"
                placeholder="Masukkan nama pengurus projek"
              />

              <FormKit
                type="email"
                name="email"
                label="Emel"
                validation="required|email"
                placeholder="Masukkan alamat emel"
              />

              <FormKit
                type="tel"
                name="phone"
                label="No. Telefon"
                placeholder="Masukkan nombor telefon"
              />
            </div>
          </div>

          <div class="form-actions">
            <rs-button
              label="Batal"
              variant="outline"
              @click="handleCancel"
              :disabled="loading"
            >
              Batal
            </rs-button>
            <rs-button btn-type="submit" variant="primary" :disabled="loading">
              <Icon class="mr-2 w-4 h-4" name="mdi:send" />
              Hantar
            </rs-button>
          </div>
        </FormKit>
      </rs-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-form-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-section {
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;

  :deep(.btn-submit) {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    background-color: #4a90e2;
    color: white;
    border: none;
    transition: background-color 0.3s;

    &:hover:not(:disabled) {
      background-color: #357abd;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  :deep(.btn-cancel) {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    background-color: #fff;
    color: #666;
    border: 1px solid #ddd;
    transition: background-color 0.3s;

    &:hover:not(:disabled) {
      background-color: #f5f5f5;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}
</style>
