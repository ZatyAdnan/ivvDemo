<template>
    <Breadcrumb />
    <!-- contractor summary data -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <rs-card>
            <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                <div
                    class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
                >
                    <Icon class="text-primary" name="material-symbols:person-book"></Icon>
                </div>
                <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight">
                    6</span>
                    <span class="text-base font-semibold text-gray-500"
                    >Jumlah Kontraktor</span>
                </div>
            </div>
        </rs-card>
        <rs-card>
            <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                <div
                    class="p-5 flex justify-center items-center bg-warning/20 rounded-2xl"
                >
                    <Icon class="text-primary" name="material-symbols:verified-user-outline"></Icon>
                </div>
                <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight">
                    4</span>
                    <span class="text-base font-semibold text-gray-500"
                    >Kontraktor Aktif</span>
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
        <rs-table :data="tableData" advanced :field = "field">
            <template v-slot:name="data">{{ data.value.name }}</template> 
            <template v-slot:category="data">{{ data.value.category }}</template> 
            <template v-slot:grade="data">{{ data.value.grade }}</template> 
            <template v-slot:personInCharge="data">
                {{ data.value.repName }}<br>
                {{ data.value.repPosition }}<br>
                {{ data.value.repIC }}<br>
                {{ data.value.repPhone }}<br>
                {{ data.value.repEmail }}
            </template> 
            <template v-slot:address="data">
                {{ data.value.address1 }}
                {{ data.value.address2 }}<br>
                {{ data.value.city }}
                {{ data.value.postcode }}<br>
                {{ data.value.state }}
            </template>
            <template v-slot:tindakan="data">
                <div class="flex gap-2">  
                    <rs-button variant="primary" @click="openEditModal(data.value)" title="Kemaskini">
                        <Icon name="material-symbols:edit" class="w-4 h-4" />
                    </rs-button>

                    <rs-button variant="primary" @click="openDeleteModal(data.value.id)" title="Padam">
                        <Icon name="material-symbols:delete" class="w-4 h-4" />
                    </rs-button>
                </div>
            </template>
        </rs-table>
    </rs-card>

    <!-- Add Modal -->
    <rs-modal title="Tambah Kontraktor" size="lg" :modelValue="isAddModalVisible" @update:modelValue="isAddModalVisible = $event">
      <template #body>
        <FormKit type="form" :actions="false" @submit="handleAddSubmit">
          <h4 class="font-semibold text-lg mb-2">Maklumat Syarikat</h4>
          <div class="grid grid-cols-2 gap-4">
            <FormKit type="text" name="name" label="Nama Syarikat" validation="required" placeholder="Masukkan nama syarikat" />
            <FormKit type="text" name="registrationNo" label="No. Pendaftaran Syarikat" validation="required" placeholder="Masukkan no. pendaftaran" />
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
            <FormKit type="text" name="address1" label="Alamat 1" validation="required" placeholder="Masukkan alamat 1" />
            <FormKit type="text" name="address2" label="Alamat 2" placeholder="Masukkan alamat 2" />
          </div>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <FormKit type="text" name="city" label="Bandar" validation="required" placeholder="Masukkan bandar" />           
            <FormKit type="text" name="postcode" label="Poskod" validation="required|number|length:5" placeholder="Masukkan poskod" />
            <FormKit
              type="select"
              name="state"
              label="Negeri"
              validation="required"
              placeholder="Pilih negeri"
              :options="states"
            />
          </div>
         
          <h4 class="font-semibold text-lg mt-8 mb-2">Maklumat Wakil Syarikat</h4>
          <div class="grid grid-cols-3 gap-4">
            <FormKit type="text" name="repName" label="Nama Wakil" validation="required" placeholder="Masukkan nama wakil" />
            <FormKit type="text" name="repPosition" label="Jawatan" validation="required" placeholder="Masukkan jawatan" />
            <FormKit type="text" name="repIC" label="No. Kad Pengenalan" validation="required" placeholder="Masukkan no. kad pengenalan" />
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <FormKit type="tel" name="repPhone" label="No. Telefon" validation="required" placeholder="Masukkan no. telefon" />
            <FormKit type="email" name="repEmail" label="Emel" validation="required|email" placeholder="Masukkan emel" class="mt-4" />
           </div>

          <div class="flex justify-end gap-2 mt-6">
            <rs-button variant="primary" btn-type="submit">
              Tambah
            </rs-button>
          </div>
        </FormKit>
      </template>
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
                    <FormKit type="text" name="name" label="Nama Syarikat" validation="required" placeholder="Masukkan nama syarikat" />
                    <FormKit type="text" name="registrationNo" label="No. Pendaftaran Syarikat" validation="required" placeholder="Masukkan no. pendaftaran" />
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
                    <FormKit type="text" name="address1" label="Alamat 1" validation="required" placeholder="Masukkan alamat 1" />
                    <FormKit type="text" name="address2" label="Alamat 2" placeholder="Masukkan alamat 2" />
                </div>
                <div class="grid grid-cols-3 gap-4 mt-4">
                    <FormKit type="text" name="city" label="Bandar" validation="required" placeholder="Masukkan bandar" />
                    <FormKit type="text" name="postcode" label="Poskod" validation="required|number|length:5" placeholder="Masukkan poskod" />
                    <FormKit
                      type="select"
                      name="state"
                      label="Negeri"
                      validation="required"
                      placeholder="Pilih negeri"
                      :options="states"
                    />
                </div>
                
                <h4 class="font-semibold text-lg mt-8 mb-2">Maklumat Wakil Syarikat</h4>
                <div class="grid grid-cols-2 gap-4">
                    <FormKit type="text" name="repName" label="Nama Wakil" validation="required" placeholder="Masukkan nama wakil" />
                    <FormKit type="text" name="repPosition" label="Jawatan" validation="required" placeholder="Masukkan jawatan" />
                </div>
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <FormKit type="text" name="repIC" label="No. Kad Pengenalan" validation="required" placeholder="Masukkan no. kad pengenalan" />
                    <FormKit type="tel" name="repPhone" label="No. Telefon" validation="required" placeholder="Masukkan no. telefon" />
                </div>
                <FormKit type="email" name="repEmail" label="Emel" validation="required|email" placeholder="Masukkan emel" class="mt-4" />

                <div class="flex justify-end gap-2 mt-6">
                    <rs-button variant="primary" btn-type="submit">
                        Kemaskini
                    </rs-button>
                </div>
            </FormKit>
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
        <p>Adakah anda pasti untuk memadam kontraktor ini?</p>
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
    const field =['name' ,'address', 'category','grade','personInCharge','tindakan'];

    const tableData = ref([
        {
            id: 1,
            name: 'Syarikat ABC Sdn Bhd',
            registrationNo: '123456-A',
            address1: 'No. 123, Jalan Teknologi',
            address2: 'Taman Teknologi',
            city: 'Shah Alam',
            state: 'Selangor',
            postcode: '40150',
            email: 'contact@abc.com',
            phone: '03-12345678',
            category: 'Pembekal',
            grade: 'G7',
            expertise: 'Pembangunan Sistem, Infrastruktur IT',
            repName: 'Ahmad bin Abdullah',
            repPosition: 'Pengurus Projek',
            repIC: '800101-14-5567',
            repPhone: '012-3456789',
            repEmail: 'ahmad@abc.com',
            status: 'Aktif',
            tindakan: ''
        },
        {
            id: 2,
            name: 'XYZ Technologies',
            registrationNo: '789012-B',
            address1: 'Level 12, Menara XYZ',
            address2: 'Jalan Bangsar',
            city: 'Kuala Lumpur',
            state: 'W.P. Kuala Lumpur',
            postcode: '50470',
            email: 'info@xyz.com',
            phone: '03-87654321',
            category: 'Kontraktor',
            grade: 'G6',
            expertise: 'Keselamatan Sistem, Rangkaian',
            status: 'Aktif',
            tindakan: ''
        },
        {
            id: 3,
            name: 'Maju Enterprise',
            registrationNo: '345678-C',
            address1: 'No. 45, Jalan Maju',
            address2: '',
            city: 'Petaling Jaya',
            state: 'Selangor',
            postcode: '46200',
            email: 'admin@maju.com',
            phone: '03-11223344',
            category: 'Pembekal',
            grade: 'G5',
            expertise: 'Perisian, Perundingan IT',
            status: 'Tidak Aktif',
            tindakan: ''
        },
    ]);
    
    const isAddModalVisible = ref(false);
    const isEditModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const selectedContractor = ref(null);
    const contractorToDelete = ref(null);

    // Add contractor categories and CIDB grades
    const contractorCategories = [
        { label: 'Pembekal', value: 'Pembekal' },
        { label: 'Kontraktor', value: 'Kontraktor' },
        { label: 'Perunding', value: 'Perunding' }
    ];

    const cidbGrades = [
        { label: 'G1', value: 'G1' },
        { label: 'G2', value: 'G2' },
        { label: 'G3', value: 'G3' },
        { label: 'G4', value: 'G4' },
        { label: 'G5', value: 'G5' },
        { label: 'G6', value: 'G6' },
        { label: 'G7', value: 'G7' }
    ];

    // Add Malaysian states
    const states = [
        { label: 'Johor', value: 'Johor' },
        { label: 'Kedah', value: 'Kedah' },
        { label: 'Kelantan', value: 'Kelantan' },
        { label: 'Melaka', value: 'Melaka' },
        { label: 'Negeri Sembilan', value: 'Negeri Sembilan' },
        { label: 'Pahang', value: 'Pahang' },
        { label: 'Perak', value: 'Perak' },
        { label: 'Perlis', value: 'Perlis' },
        { label: 'Pulau Pinang', value: 'Pulau Pinang' },
        { label: 'Sabah', value: 'Sabah' },
        { label: 'Sarawak', value: 'Sarawak' },
        { label: 'Selangor', value: 'Selangor' },
        { label: 'Terengganu', value: 'Terengganu' },
        { label: 'W.P. Kuala Lumpur', value: 'W.P. Kuala Lumpur' },
        { label: 'W.P. Labuan', value: 'W.P. Labuan' },
        { label: 'W.P. Putrajaya', value: 'W.P. Putrajaya' }
    ];

    const openAddModal = () => {
        isAddModalVisible.value = true;
    };

    const openEditModal = (contractor) => {
        selectedContractor.value = {
            id: contractor.id,
            name: contractor.name,
            registrationNo: contractor.registrationNo,
            address1: contractor.address1,
            address2: contractor.address2,
            city: contractor.city,
            state: contractor.state,
            postcode: contractor.postcode,
            email: contractor.email,
            phone: contractor.phone,
            category: contractor.category,
            grade: contractor.grade,
            expertise: contractor.expertise,
            repName: contractor.repName,
            repPosition: contractor.repPosition,
            repIC: contractor.repIC,
            repPhone: contractor.repPhone,
            repEmail: contractor.repEmail
        };
        isEditModalVisible.value = true;
    };

    const handleAddSubmit = async (formData) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const newId = tableData.value.length ? Math.max(...tableData.value.map(cont => cont.id)) + 1 : 1;
        
        const newContractor = {
            id: newId,
            name: formData.name,
            registrationNo: formData.registrationNo,
            address1: formData.address1,
            address2: formData.address2 || '',
            city: formData.city,
            state: formData.state,
            postcode: formData.postcode,
            email: formData.email,
            phone: formData.phone,
            category: formData.category,
            grade: formData.grade,
            expertise: formData.expertise,
            repName: formData.repName,
            repPosition: formData.repPosition,
            repIC: formData.repIC,
            repPhone: formData.repPhone,
            repEmail: formData.repEmail,
            status: 'Aktif'
        };
        
        tableData.value.push(newContractor);
        isAddModalVisible.value = false;
        $swal.fire('Berjaya!', 'Kontraktor baru berjaya ditambah', 'success');
    };

    const handleEditSubmit = async (formData) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const index = tableData.value.findIndex(cont => cont.id === formData.id);
        if (index !== -1) {
            tableData.value[index] = {
                ...tableData.value[index],
                name: formData.name,
                registrationNo: formData.registrationNo,
                address1: formData.address1,
                address2: formData.address2 || '',
                city: formData.city,
                state: formData.state,
                postcode: formData.postcode,
                email: formData.email,
                phone: formData.phone,
                category: formData.category,
                grade: formData.grade,
                expertise: formData.expertise,
                repName: formData.repName,
                repPosition: formData.repPosition,
                repIC: formData.repIC,
                repPhone: formData.repPhone,
                repEmail: formData.repEmail
            };
        }
        
        isEditModalVisible.value = false;
        $swal.fire('Berjaya!', 'Maklumat kontraktor berjaya dikemaskini', 'success');
    };

    const openDeleteModal = (id) => {
        contractorToDelete.value = id;
        isDeleteModalVisible.value = true;
    };

    const confirmDelete = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        tableData.value = tableData.value.filter(cont => cont.id !== contractorToDelete.value);
        isDeleteModalVisible.value = false;
        $swal.fire('Dipadam!', 'Kontraktor telah dipadam.', 'success');
    };
</script>

<style lang="scss" scoped>
</style>