<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

definePageMeta({
  title: "Tetapan",
  middleware: ["auth"],
  breadcrumb: [
    {
      name: "Jenis Dokumen",
      type: "current",
    },
  ],
});

const { $swal } = useNuxtApp();

// Table configuration
const field = [
  "jenisDokumen",
  "kriteriaMinimum",
  "jumlahDokumenDisemak",
  "tindakan",
];

// Reactive state
const tableData = ref([]);
const loading = ref(false);
const summaryData = ref({
  total: 0,
  pending: 0,
});

const isAddModalVisible = ref(false);
const isEditModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const selectedDocument = ref(null);
const documentToDelete = ref(null);

// Fetch documents data
async function fetchDocuments() {
  loading.value = true;
  try {
    const response = await $fetch("/api/documents");
    if (response.statusCode === 200) {
      tableData.value = response.data;
      summaryData.value = response.summary;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error fetching documents:", error);
    $swal.fire({
      icon: "error",
      title: "Ralat",
      text: error.message || "Gagal memuat turun data dokumen",
    });
  } finally {
    loading.value = false;
  }
}

const openAddModal = () => {
  isAddModalVisible.value = true;
};

const openEditModal = (document) => {
  selectedDocument.value = { ...document };
  isEditModalVisible.value = true;
};

const handleAddSubmit = async (formData) => {
  try {
    const response = await $fetch("/api/documents", {
      method: "POST",
      body: {
        name: formData.name,
        km: formData.km,
        status: "PENDING",
      },
    });

    if (response.statusCode === 201) {
      await $swal.fire({
        icon: "success",
        title: "Berjaya!",
        text: "Jenis dokumen baru berjaya ditambah",
      });
      isAddModalVisible.value = false;
      fetchDocuments();
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error adding document:", error);
    $swal.fire({
      icon: "error",
      title: "Ralat",
      text: error.message || "Gagal menambah jenis dokumen",
    });
  }
};

const handleEditSubmit = async (formData) => {
  try {
    const response = await $fetch(`/api/documents/${formData.id}`, {
      method: "PUT",
      body: {
        name: formData.name,
        km: formData.km,
        status: formData.status,
      },
    });

    if (response.statusCode === 200) {
      await $swal.fire({
        icon: "success",
        title: "Berjaya!",
        text: "Jenis dokumen berjaya dikemaskini",
      });
      isEditModalVisible.value = false;
      fetchDocuments();
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error updating document:", error);
    $swal.fire({
      icon: "error",
      title: "Ralat",
      text: error.message || "Gagal mengemaskini jenis dokumen",
    });
  }
};

const openDeleteModal = (id) => {
  documentToDelete.value = id;
  isDeleteModalVisible.value = true;
};

const confirmDelete = async () => {
  try {
    const response = await $fetch(`/api/documents/${documentToDelete.value}`, {
      method: "DELETE",
    });

    if (response.statusCode === 200) {
      await $swal.fire({
        icon: "success",
        title: "Dipadam!",
        text: "Jenis dokumen telah dipadam.",
      });
      isDeleteModalVisible.value = false;
      fetchDocuments();
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    $swal.fire({
      icon: "error",
      title: "Ralat",
      text: error.message || "Gagal memadam jenis dokumen",
    });
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchDocuments();
});
</script>

<template>
  <div>
    <Breadcrumb />
    <!-- documents summary data -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon
              class="text-primary"
              name="material-symbols:file-copy-outline-rounded"
            ></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{ summaryData.total }}</span
            >
            <span class="text-base font-semibold text-gray-500"
              >Jumlah Dokumen</span
            >
          </div>
        </div>
      </rs-card>
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-warning/20 rounded-2xl"
          >
            <Icon
              class="text-primary"
              name="material-symbols:lab-profile-outline"
            ></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{ summaryData.pending }}</span
            >
            <span class="text-base font-semibold text-gray-500"
              >Dokumen menunggu
            </span>
          </div>
        </div>
      </rs-card>
    </div>

    <div class="flex items-center justify-between mb-2">
      <h3 class="text-2xl font-bold tracking-tight">Jenis Dokumen</h3>
      <rs-button @click="openAddModal">
        <Icon name="material-symbols:add" class="mr-1"></Icon>
        Tambah Jenis Dokumen
      </rs-button>
    </div>
    <rs-card class="px-0 py-4">
      <rs-table :data="tableData" :loading="loading" advanced :field="field">
        <template v-slot:jenisDokumen="data">{{ data.value.name }}</template>
        <template v-slot:kriteriaMinimum="data">
          <div class="max-w-[300px] truncate">{{ data.value.km }}</div>
        </template>
        <template v-slot:jumlahDokumenDisemak="data">{{
          data.value.documentCount || 0
        }}</template>
        <template v-slot:tindakan="data">
          <div class="flex gap-2">
            <rs-button
              variant="primary"
              @click="openEditModal(data.value)"
              title="Kemaskini"
            >
              <Icon name="material-symbols:edit" class="w-4 h-4" />
            </rs-button>

            <rs-button
              variant="danger"
              @click="openDeleteModal(data.value.id)"
              title="Padam"
            >
              <Icon name="material-symbols:delete" class="w-4 h-4" />
            </rs-button>
          </div>
        </template>
      </rs-table>
    </rs-card>

    <!-- Add Modal -->
    <rs-modal
      title="Tambah Jenis Dokumen"
      size="md"
      :modelValue="isAddModalVisible"
      @update:modelValue="isAddModalVisible = $event"
    >
      <template #body>
        <FormKit type="form" :actions="false" @submit="handleAddSubmit">
          <FormKit
            type="text"
            name="name"
            label="Nama Jenis Dokumen"
            validation="required"
            placeholder="Masukkan nama jenis dokumen"
          />
          <FormKit
            type="textarea"
            name="km"
            label="Kriteria Minimum"
            validation="required"
            placeholder="Masukkan kriteria minimum"
            rows="3"
          />
          <div class="flex justify-end gap-2 mt-4">
            <rs-button
              variant="primary-outline"
              @click="isAddModalVisible = false"
              :disabled="loading"
            >
              Batal
            </rs-button>
            <rs-button variant="primary" btn-type="submit" :disabled="loading">
              <Icon name="material-symbols:add" class="mr-1"></Icon>
              {{ loading ? "Sedang diproses..." : "Tambah" }}
            </rs-button>
          </div>
        </FormKit>
      </template>
      <template #footer> </template>
    </rs-modal>

    <!-- Edit Modal -->
    <rs-modal
      title="Kemaskini Jenis Dokumen"
      size="md"
      :modelValue="isEditModalVisible"
      @update:modelValue="isEditModalVisible = $event"
    >
      <template #body>
        <FormKit
          type="form"
          :actions="false"
          @submit="handleEditSubmit"
          :value="selectedDocument"
        >
          <FormKit
            type="text"
            name="name"
            label="Nama Jenis Dokumen"
            validation="required"
            placeholder="Masukkan nama jenis dokumen"
          />
          <FormKit
            type="textarea"
            name="km"
            label="Kriteria Minimum"
            validation="required"
            placeholder="Masukkan kriteria minimum"
            rows="3"
          />
          <div class="flex justify-end gap-2 mt-4">
            <rs-button
              variant="primary-outline"
              @click="isEditModalVisible = false"
              :disabled="loading"
            >
              Batal
            </rs-button>
            <rs-button variant="primary" btn-type="submit" :disabled="loading">
              <Icon name="material-symbols:edit" class="mr-1"></Icon>
              {{ loading ? "Sedang diproses..." : "Kemaskini" }}
            </rs-button>
          </div>
        </FormKit>
      </template>
      <template #footer> </template>
    </rs-modal>

    <!-- Delete Confirmation Modal -->
    <RsModal
      title="Sahkan Padam"
      size="sm"
      :modelValue="isDeleteModalVisible"
      @update:modelValue="isDeleteModalVisible = $event"
    >
      <template #body>
        <p>Adakah anda pasti untuk memadam jenis dokumen ini?</p>
      </template>
      <template #footer>
        <rs-button variant="danger" @click="confirmDelete" :disabled="loading">
          {{ loading ? "Sedang diproses..." : "Padam" }}
        </rs-button>
        <rs-button @click="isDeleteModalVisible = false" :disabled="loading"
          >Batal</rs-button
        >
      </template>
    </RsModal>
  </div>
</template>

<style lang="scss" scoped>
.form-section {
  margin-bottom: 1.5rem;
}

:deep(.v-popper__popper) {
  max-width: 400px !important;
  .v-popper__wrapper {
    max-width: 100% !important;
  }
  .v-popper__inner {
    max-width: 100% !important;
    word-break: break-word;
  }
}
</style>
