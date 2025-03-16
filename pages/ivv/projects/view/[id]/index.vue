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
        <h3 class="text-2xl font-bold tracking-tight">Jenis Dokumen</h3>
        <!-- <rs-button @click="openAddModal">
            <Icon name="material-symbols:add" class="mr-1"></Icon>
            Tambah Jenis Dokumen
        </rs-button> -->
    </div>
    <rs-card class="px-0 py-4">
        <rs-table :data="tableData" advanced>           
          <template v-slot:tindakan="data">
              <div class="flex gap-2">            
                  <NuxtLink :to="`/ivv/projects/document/${data.value.id}`" >  
                      <rs-button variant="primary" title="Muat Naik Dokumen">
                          <Icon name="material-symbols:upload-file-outline" class="w-4 h-4" > </Icon>
                            Tambah Dokumen 
                      </rs-button>                                    
                  </NuxtLink>
                  
                  <!-- <NuxtLink :to="`/ivv/projects/document/semakan/${data.value.id}`">
                      <rs-button variant="primary" title="Semakan Dokumen">
                          <Icon name="material-symbols:checklist" class="w-4 h-4" />
                      </rs-button>
                  </NuxtLink> -->
                  <!-- <rs-button variant="primary" title="Semakan Dokumen"                        
                        @click="openAddModalKM"
                    >
                    <Icon name="material-symbols:checklist" class="w-4 h-4" />
                    </rs-button> -->

                  <!-- <rs-button variant="primary" @click="openEditModal(data.value)" title="Kemaskini">
                      <Icon name="material-symbols:edit" class="w-4 h-4" />
                  </rs-button> -->

                  <!-- <rs-button variant="primary" @click="openDeleteModal(data.value.id)" title="Padam">
                      <Icon name="material-symbols:delete" class="w-4 h-4" />
                  </rs-button> -->
              </div>
          </template>
        </rs-table>
    </rs-card>

    <!-- Add Modal -->
    <rs-modal title="Tambah Jenis Dokumen" size="md" :modelValue="isAddModalVisible"  @update:modelValue="isAddModalVisible = $event" >
      <template #body>
        <FormKit type="form" :actions="false" @submit="handleAddSubmit" >
          <FormKit type="text" name="name" label="Nama Jenis Dokumen" validation="required" placeholder="Masukkan nama jenis dokumen" />
          <div class="flex justify-end gap-2">
            <rs-button variant="primary" btn-type="submit">
              Tambah
            </rs-button>
          </div>
        </FormKit>
      </template>
      <template #footer>
      </template>
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
                    name="jenisDokumen"
                    label="Nama Jenis Dokumen"
                    validation="required"
                    placeholder="Masukkan nama jenis dokumen"
                />
                <div class="flex justify-end gap-2">
                    <rs-button variant="primary" btn-type="submit">
                        Kemaskini
                    </rs-button>
                </div>
            </FormKit>
        </template>
        <template #footer>
        </template>
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
        <rs-button variant="danger" @click="confirmDelete">
          Padam
        </rs-button>
        <rs-button @click="isDeleteModalVisible = false">
          Batal
        </rs-button>
      </template>
    </RsModal>
</template>

<script setup>
    const { $swal } = useNuxtApp();

    const tableData = ref([
        {id:1,jenisDokumen: 'BPR', jumlahDokumenDisemak: 0, tindakan:"" },
        {id:2,jenisDokumen: 'URS', jumlahDokumenDisemak: 0, tindakan:"" },
        {id:3,jenisDokumen: 'SRS', jumlahDokumenDisemak: 0, tindakan:"" },
        {id:4,jenisDokumen: 'SDS', jumlahDokumenDisemak: 0, tindakan:"" },
        {id:5,jenisDokumen: 'Skrip Ujian', jumlahDokumenDisemak: 0, tindakan:"" },
        {id:6,jenisDokumen: 'Manual Penguna', jumlahDokumenDisemak: 0, tindakan:"" },
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
        selectedDocument.value = {
            id: document.id,
            jenisDokumen: document.jenisDokumen
        };
        isEditModalVisible.value = true;
    };

    const handleAddSubmit = async (formData) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Add new document type to the table data
        const newId = tableData.value.length ? Math.max(...tableData.value.map(doc => doc.id)) + 1 : 1;
        
        // Create new document with the input name
        const newDocument = {
            id: newId,
            jenisDokumen: formData.name,
            jumlahDokumenDisemak: 0
        };
        
        tableData.value.push(newDocument);
        isAddModalVisible.value = false;
        $swal.fire('Berjaya!', 'Jenis dokumen baru berjaya ditambah', 'success');
    };

    const handleEditSubmit = async (formData) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Update the table data
        const index = tableData.value.findIndex(doc => doc.id === formData.id);
        if (index !== -1) {
            tableData.value[index] = {
                ...tableData.value[index],
                jenisDokumen: formData.jenisDokumen
            };
        }
        
        isEditModalVisible.value = false;
        $swal.fire('Berjaya!', 'Jenis dokumen berjaya dikemaskini', 'success');
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
        $swal.fire('Dipadam!', 'Jenis dokumen telah dipadam.', 'success');
    };

    const openAddModalKM = () => {
  newDocument.value = {
    // projectName: "Project Alpha", // Set default project name
    documentType: "Project Plan", // Set default document type
    referenceFile: "",
    criteria: "",
    versions: [],
  };
  showAddModal.value = true;
};
</script>

<style lang="scss" scoped>
</style>