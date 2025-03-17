<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

definePageMeta({
  title: "Kontraktor",
  middleware: ["auth"],
  breadcrumb: [
    {
      name: "Kontraktor",
      type: "current",
    },
  ],
});

const { $swal } = useNuxtApp();
const field = [
  "name",
  "address",
  "category",
  "grade",
  "personInCharge",
  "tindakan",
];

const tableData = ref([]);
const loading = ref(false);
const summaryData = ref({
  total: 0,
  active: 0,
});

const isAddModalVisible = ref(false);
const isEditModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const selectedContractor = ref(null);
const contractorToDelete = ref(null);

// Add contractor categories and CIDB grades from lookup
const contractorCategories = ref([]);
const cidbGrades = ref([]);
const states = ref([]);

// Fetch lookup data
async function fetchLookupData() {
  try {
    // Fetch contractor categories
    const categoriesResponse = await $fetch("/api/lookup/kategori_kontraktor");
    if (categoriesResponse.statusCode === 200) {
      contractorCategories.value = categoriesResponse.data.map((item) => ({
        label: item.lookupValue,
        value: item.lookupID,
      }));
    }

    // Fetch CIDB grades
    const gradesResponse = await $fetch("/api/lookup/gred_cidb");
    if (gradesResponse.statusCode === 200) {
      cidbGrades.value = gradesResponse.data.map((item) => ({
        label: item.lookupValue,
        value: item.lookupID,
      }));
    }

    // Fetch states
    const statesResponse = await $fetch("/api/lookup/negeri");
    if (statesResponse.statusCode === 200) {
      states.value = statesResponse.data.map((item) => ({
        label: item.lookupValue,
        value: item.lookupID,
      }));
    }
  } catch (error) {
    console.error("Error fetching lookup data:", error);
    $swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to load lookup data",
    });
  }
}

// Fetch contractors data
async function fetchContractors() {
  loading.value = true;
  try {
    const response = await $fetch("/api/contractors");
    if (response.statusCode === 200) {
      tableData.value = response.data.map((contractor) => ({
        ...contractor,
        category: contractor.categoryName,
        grade: contractor.gradeName,
        state: contractor.stateName,
        categoryId: contractor.category,
        gradeId: contractor.grade,
        stateId: contractor.state,
      }));
      summaryData.value = response.summary;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error fetching contractors:", error);
    $swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "Failed to load contractors",
    });
  } finally {
    loading.value = false;
  }
}

const openAddModal = () => {
  isAddModalVisible.value = true;
};

const openEditModal = (contractor) => {
  selectedContractor.value = {
    ...contractor,
    category: contractor.categoryId,
    grade: contractor.gradeId,
    state: contractor.stateId,
  };
  isEditModalVisible.value = true;
};

const handleAddSubmit = async (formData) => {
  try {
    const response = await $fetch("/api/contractors", {
      method: "POST",
      body: {
        ...formData,
        category: formData.category,
        grade: formData.grade,
        state: formData.state,
      },
    });

    if (response.statusCode === 201) {
      await $swal.fire({
        icon: "success",
        title: "Berjaya!",
        text: "Kontraktor baru berjaya ditambah",
      });
      isAddModalVisible.value = false;
      fetchContractors();
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error adding contractor:", error);
    $swal.fire({
      icon: "error",
      title: "Ralat",
      text: error.message || "Gagal menambah kontraktor",
    });
  }
};

const handleEditSubmit = async (formData) => {
  try {
    const response = await $fetch(`/api/contractors/${formData.id}`, {
      method: "PUT",
      body: {
        ...formData,
        category: formData.category,
        grade: formData.grade,
        state: formData.state,
      },
    });

    if (response.statusCode === 200) {
      await $swal.fire({
        icon: "success",
        title: "Berjaya!",
        text: "Maklumat kontraktor berjaya dikemaskini",
      });
      isEditModalVisible.value = false;
      fetchContractors();
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error updating contractor:", error);
    $swal.fire({
      icon: "error",
      title: "Ralat",
      text: error.message || "Gagal mengemaskini kontraktor",
    });
  }
};

const openDeleteModal = (id) => {
  contractorToDelete.value = id;
  isDeleteModalVisible.value = true;
};

const confirmDelete = async () => {
  try {
    const response = await $fetch(
      `/api/contractors/${contractorToDelete.value}`,
      {
        method: "DELETE",
      }
    );

    if (response.statusCode === 200) {
      await $swal.fire({
        icon: "success",
        title: "Dipadam!",
        text: "Kontraktor telah dipadam.",
      });
      isDeleteModalVisible.value = false;
      fetchContractors();
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error deleting contractor:", error);
    $swal.fire({
      icon: "error",
      title: "Ralat",
      text: error.message || "Gagal memadam kontraktor",
    });
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchLookupData().then(() => {
    fetchContractors();
  });
});
</script>

<template>
  <div>
    <Breadcrumb />
    <!-- contractor summary data -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon
              class="text-primary"
              name="material-symbols:person-book"
            ></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{ summaryData.total }}</span
            >
            <span class="text-base font-semibold text-gray-500"
              >Jumlah Kontraktor</span
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
              name="material-symbols:verified-user-outline"
            ></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{ summaryData.active }}</span
            >
            <span class="text-base font-semibold text-gray-500"
              >Kontraktor Aktif</span
            >
          </div>
        </div>
      </rs-card>
    </div>

    <div class="flex items-center justify-between mb-2">
      <h3 class="text-2xl font-bold tracking-tight">Senarai Kontraktor</h3>
      <rs-button @click="openAddModal">
        <Icon name="material-symbols:add" class="mr-1"></Icon>
        Tambah Kontraktor
      </rs-button>
    </div>
    <rs-card class="px-0 py-4">
      <rs-table :data="tableData" :loading="loading" advanced :field="field">
        <template v-slot:name="data">{{ data.value.name }}</template>
        <template v-slot:category="data">{{ data.value.category }}</template>
        <template v-slot:grade="data">{{ data.value.grade }}</template>
        <template v-slot:address="data">
          {{ data.value.address1 }}
          {{ data.value.address2 }}<br />
          {{ data.value.city }}
          {{ data.value.postcode }}<br />
          {{ data.value.state }}
        </template>
        <template v-slot:personInCharge="data">
          {{ data.value.repName }}<br />
          {{ data.value.repPosition }}<br />
          {{ data.value.repIC }}<br />
          {{ data.value.repPhone }}<br />
          {{ data.value.repEmail }}
        </template>
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
      title="Tambah Kontraktor"
      size="lg"
      :modelValue="isAddModalVisible"
      @update:modelValue="isAddModalVisible = $event"
    >
      <template #body>
        <FormKit type="form" :actions="false" @submit="handleAddSubmit">
          <h4 class="font-semibold text-lg mb-2">Maklumat Syarikat</h4>
          <div class="grid grid-cols-2 gap-4">
            <FormKit
              type="text"
              name="name"
              label="Nama Syarikat"
              validation="required"
              placeholder="Masukkan nama syarikat"
            />
            <FormKit
              type="text"
              name="registrationNo"
              label="No. Pendaftaran Syarikat"
              validation="required"
              placeholder="Masukkan no. pendaftaran"
            />
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <FormKit
              type="select"
              name="category"
              label="Kategori Kontraktor"
              validation="required"
              placeholder="Pilih kategori"
              :options="contractorCategories"
            />
            <FormKit
              type="select"
              name="grade"
              label="Gred CIDB"
              validation="required"
              placeholder="Pilih gred"
              :options="cidbGrades"
            />
          </div>
          <FormKit
            type="textarea"
            name="expertise"
            label="Bidang Kepakaran"
            validation="required"
            placeholder="Masukkan bidang kepakaran"
            rows="3"
            class="mt-4"
          />
          <div class="grid grid-cols-2 gap-4 mt-4">
            <FormKit
              type="text"
              name="address1"
              label="Alamat 1"
              validation="required"
              placeholder="Masukkan alamat 1"
            />
            <FormKit
              type="text"
              name="address2"
              label="Alamat 2"
              placeholder="Masukkan alamat 2"
            />
          </div>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <FormKit
              type="text"
              name="city"
              label="Bandar"
              validation="required"
              placeholder="Masukkan bandar"
            />
            <FormKit
              type="text"
              name="postcode"
              label="Poskod"
              validation="required|number|length:5"
              placeholder="Masukkan poskod"
            />
            <FormKit
              type="select"
              name="state"
              label="Negeri"
              validation="required"
              placeholder="Pilih negeri"
              :options="states"
            />
          </div>

          <h4 class="font-semibold text-lg mt-8 mb-2">
            Maklumat Wakil Syarikat
          </h4>
          <div class="grid grid-cols-3 gap-4">
            <FormKit
              type="text"
              name="repName"
              label="Nama Wakil"
              validation="required"
              placeholder="Masukkan nama wakil"
            />
            <FormKit
              type="text"
              name="repPosition"
              label="Jawatan"
              validation="required"
              placeholder="Masukkan jawatan"
            />
            <FormKit
              type="text"
              name="repIC"
              label="No. Kad Pengenalan"
              validation="required"
              placeholder="Masukkan no. kad pengenalan"
            />
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <FormKit
              type="tel"
              name="repPhone"
              label="No. Telefon"
              validation="required"
              placeholder="Masukkan no. telefon"
            />
            <FormKit
              type="email"
              name="repEmail"
              label="Emel"
              validation="required|email"
              placeholder="Masukkan emel"
              class="mt-4"
            />
          </div>

          <div class="flex justify-end gap-2 mt-6">
            <rs-button
              variant="primary-outline"
              @click="isAddModalVisible = false"
              :disabled="loading"
              >Batal</rs-button
            >
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
      title="Kemaskini Kontraktor"
      size="lg"
      :modelValue="isEditModalVisible"
      @update:modelValue="isEditModalVisible = $event"
    >
      <template #body>
        <FormKit
          type="form"
          :actions="false"
          @submit="handleEditSubmit"
          :value="selectedContractor"
        >
          <h4 class="font-semibold text-lg mb-2">Maklumat Syarikat</h4>
          <div class="grid grid-cols-2 gap-4">
            <FormKit
              type="text"
              name="name"
              label="Nama Syarikat"
              validation="required"
              placeholder="Masukkan nama syarikat"
            />
            <FormKit
              type="text"
              name="registrationNo"
              label="No. Pendaftaran Syarikat"
              validation="required"
              placeholder="Masukkan no. pendaftaran"
            />
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <FormKit
              type="select"
              name="category"
              label="Kategori Kontraktor"
              validation="required"
              placeholder="Pilih kategori"
              :options="contractorCategories"
            />
            <FormKit
              type="select"
              name="grade"
              label="Gred CIDB"
              validation="required"
              placeholder="Pilih gred"
              :options="cidbGrades"
            />
          </div>
          <FormKit
            type="textarea"
            name="expertise"
            label="Bidang Kepakaran"
            validation="required"
            placeholder="Masukkan bidang kepakaran"
            rows="3"
            class="mt-4"
          />
          <div class="grid grid-cols-2 gap-4 mt-4">
            <FormKit
              type="text"
              name="address1"
              label="Alamat 1"
              validation="required"
              placeholder="Masukkan alamat 1"
            />
            <FormKit
              type="text"
              name="address2"
              label="Alamat 2"
              placeholder="Masukkan alamat 2"
            />
          </div>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <FormKit
              type="text"
              name="city"
              label="Bandar"
              validation="required"
              placeholder="Masukkan bandar"
            />
            <FormKit
              type="text"
              name="postcode"
              label="Poskod"
              validation="required|number|length:5"
              placeholder="Masukkan poskod"
            />
            <FormKit
              type="select"
              name="state"
              label="Negeri"
              validation="required"
              placeholder="Pilih negeri"
              :options="states"
            />
          </div>

          <h4 class="font-semibold text-lg mt-8 mb-2">
            Maklumat Wakil Syarikat
          </h4>
          <div class="grid grid-cols-3 gap-4">
            <FormKit
              type="text"
              name="repName"
              label="Nama Wakil"
              validation="required"
              placeholder="Masukkan nama wakil"
            />
            <FormKit
              type="text"
              name="repPosition"
              label="Jawatan"
              validation="required"
              placeholder="Masukkan jawatan"
            />
            <FormKit
              type="text"
              name="repIC"
              label="No. Kad Pengenalan"
              validation="required"
              placeholder="Masukkan no. kad pengenalan"
            />
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <FormKit
              type="tel"
              name="repPhone"
              label="No. Telefon"
              validation="required"
              placeholder="Masukkan no. telefon"
            />
            <FormKit
              type="email"
              name="repEmail"
              label="Emel"
              validation="required|email"
              placeholder="Masukkan emel"
            />
          </div>

          <div class="flex justify-end gap-2 mt-6">
            <rs-button
              variant="primary-outline"
              @click="isEditModalVisible = false"
              :disabled="loading"
              >Batal</rs-button
            >
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
        <p>Adakah anda pasti untuk memadam kontraktor ini?</p>
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

<style lang="scss" scoped></style>
