<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        <rs-card>
            <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                <div
                    class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
                >
                    <Icon class="text-primary" name="material-symbols:file-copy-outline-rounded"></Icon>
                </div>
                <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight">
                        Projek Sistem NIISe Modul Pengurusan Keselamatan Sub Modul Forensik</span
                    >
                    <span class="text-base font-semibold text-gray-500"
                    >MIMOS SDN BHD</span
                    >
                </div>
            </div>
        </rs-card>
        
    </div>
    <!-- documents data -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <rs-card>
            <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                <div
                    class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
                >
                    <Icon class="text-primary" name="material-symbols:file-copy-outline-rounded"></Icon>
                </div>
                <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight">
                    4</span
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
                    <Icon class="text-primary" name="material-symbols:lab-profile-outline"></Icon>
                </div>
                <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight">
                    2</span
                    >
                    <span class="text-base font-semibold text-gray-500"
                    >Dokumen menunggu </span
                    >
                </div>
            </div>
        </rs-card>            
        <rs-card>
            <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                <div
                    class="p-5 flex justify-center items-center bg-danger rounded-2xl"
                >
                    <Icon class="text-primary" name="mingcute:file-warning-line"></Icon>
                </div>
                <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight">
                    1</span
                    >
                    <span class="text-base font-semibold text-gray-500"
                    > Lambat Hantar</span
                    >
                </div>
            </div>
        </rs-card>
    </div>

    <div class="flex items-center justify-between mb-2">
        <h3 class="text-2xl font-bold tracking-tight">Senarai Dokumen</h3>
        <NuxtLink :to="`/ivv/projects/document/add`">
          <rs-button  >
              <Icon name="material-symbols:add" class="mr-1"></Icon>
              Tambah Dokumen
          </rs-button>
        </NuxtLink>
        
    </div>

    <rs-card class="px-0 py-4">
      <rs-table :data="tableData" advanced>
        <template #action="{ value }">
          <div class="flex gap-2">
            <NuxtLink v-if="value.skor != 0" :to="`/ivv/projects/document/view?id=1`" >  
                <rs-button variant="primary" >
                    Lihat
                </rs-button>                                           
            </NuxtLink>
            <NuxtLink v-if="value.skor == 0" :to="`/ivv/projects/document/semakan`" >  
                <rs-button variant="primary" >
                    Semakan
                </rs-button>                                           
            </NuxtLink>
          </div>
        </template>
      </rs-table>
    </rs-card>

    <!-- Add Modal -->
    <RsModal
      title="Add Document Type"
      size="md"
      :modelValue="isAddModalVisible"
      @update:modelValue="isAddModalVisible = $event"
    >
      <template #body>
        <FormKit
          type="form"
          :actions="false"
          @submit="handleAddSubmit"
        >
          <FormKit
            type="text"
            name="name"
            label="Document Type Name"
            validation="required"
            placeholder="Enter document type name"
          />
          <div class="flex justify-end gap-2">
            <rs-button variant="success" btn-type="submit">
              Submit
            </rs-button>
          </div>
        </FormKit>
      </template>
    </RsModal>

    <!-- Edit Modal -->
    <RsModal
      title="Edit Document Type"
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
            label="Document Type Name"
            validation="required"
            placeholder="Enter document type name"
          />
          <div class="flex justify-end gap-2">
            <rs-button variant="success" btn-type="submit">
              Submit
            </rs-button>
          </div>
        </FormKit>
      </template>
    </RsModal>

    <!-- Delete Confirmation Modal -->
    <RsModal
      title="Confirm Delete"
      size="sm"
      :modelValue="isDeleteModalVisible"
      @update:modelValue="isDeleteModalVisible = $event"
    >
      <template #body>
        <p>Are you sure you want to delete this document type?</p>
      </template>
      <template #footer>
        <rs-button variant="danger" @click="confirmDelete">
          Delete
        </rs-button>
        <rs-button @click="isDeleteModalVisible = false">
          Cancel
        </rs-button>
      </template>
    </RsModal>
</template>

<script setup>
    const { $swal } = useNuxtApp();

    const tableData = ref([
        { versi:3,namaDokumen: 'urs_07022025',  tarikhSemakan:'-',skor:0, status: 'Dalam Proses', action:""},
        { versi:2,namaDokumen: 'urs_05022025_1', tarikhSemakan:'06/02/2025',skor:70, status: 'Lengkap', action:""},
        { versi:1,namaDokumen: 'urs_01022025_2', tarikhSemakan:'02/02/2025',skor:50, status: 'Lengkap', action:""},
    ]);
    
    const isAddModalVisible = ref(false);
    const isEditModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const selectedDocument = ref(null);
    const documentToDelete = ref(null);

    const openAddModal = () => {
        isAddModalVisible.value = true;
    };
    const openEditModal = (document) => {
    selectedDocument.value = { ...document };
    isEditModalVisible.value = true;
    };

    const handleAddSubmit = async (formData) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
    // Add new document type to the table data
    const newId = tableData.value.length ? Math.max(...tableData.value.map(doc => doc.id)) + 1 : 1;
    tableData.value.push({ id: newId, ...formData });
    isAddModalVisible.value = false;
    $swal.fire('Success!', 'New document type added successfully', 'success');
    };

    const handleEditSubmit = async (formData) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Update the table data
    const index = tableData.value.findIndex(doc => doc.id === formData.id);
    if (index !== -1) {
        tableData.value[index] = formData;
    }
    isEditModalVisible.value = false;
    $swal.fire('Success!', 'Document type updated successfully', 'success');
    };

    const openDeleteModal = (id) => {
    documentToDelete.value = id;
    isDeleteModalVisible.value = true;
    };

    const confirmDelete = async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    tableData.value = tableData.value.filter(doc => doc.id !== documentToDelete.value);
    isDeleteModalVisible.value = false;
    $swal.fire('Deleted!', 'Document type has been deleted.', 'success');
    };
</script>

<style lang="scss" scoped>
</style>