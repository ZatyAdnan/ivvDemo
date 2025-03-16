<script setup>
definePageMeta({
  title: "Document Self-Scanner",
  layout: "default",
  middleware: ["auth"], // Ensure user is logged in
});

import { ref } from "vue";
import { saveAs } from "file-saver"; // For saving files
import * as XLSX from "xlsx"; // For Excel export
import jsPDF from "jspdf"; // For PDF export

// Refs to handle the file and validation result
const documentType = ref(null);
const documentFile = ref(null); // Stores the selected file
const validationResult = ref(null); // Stores the validation result

// Dummy validation logic
const dummyValidation = () => {
  validationResult.value = {
    score: 72, // Health Meter score (0-100)
    color: "yellow", // Health Meter color based on score
    checklist: [
      {
        section: "3.5. Reka Bentuk Fungsi Sistem",
        details: `Isu
Struktur Use Case Diagram di SRS Forensik telah disediakan tanpa mengikut standard yang boleh digunapakai secara terus mengikut formula yang ditetapkan oleh CORRAD. 

Oleh itu pemetaan untuk penghasilan satu sequence diagram daripada satu Use Case ID adalah tidak betul kerana ia tidak menghasilkan satu transaksi keperluan bisnes yang lengkap.

Sebagai contoh:
UC-FOR-01.2: HADIR KE KAUNTER > SD-FOR-01.2: Hadir ke Kaunter

penghasilan satu sequence diagram ke atas satu action untuk <Hadir ke kaunter> sahaja adalah bukan satu fungsi keperluan bisnes lengkap. 

Contoh 1 fungsi bisnes lengkap:
membuat permohonan Visa (1 fungsi) = 1 SQ Diagram.
Di dalam 1 sequence diagram untuk membuat permohonan Visa tersebut perlu ada:
i) permohonan visa berjaya
ii) permhonan visa tidak berjaya

Dan transaksi fungsi permohonan visa tersebut perlu menyentuh semua lifeline yang diperlukan untuk menghasilkan satu transaksi lengkap samada transaksi berjaya atau tidak berjaya. (API, table, internal &external integrations, error message code, etc)`,
        referenceCode: "",
        classification: "MAJOR",
        isComplete: false,
        errorCategory: "BAHARU (NEW) TIDAK BETUL (INCORRECT)",
        notes: ""
      },
      {
        section: "3.5. Reka Bentuk Fungsi Sistem",
        details: `Isu lifeline pada Seguence Diagram yang diperlukan untuk menghasilkan satu transaksi fungsi bisnes tidak lengkap.

Bagi menghasilkan satu transaksi lengkap di Sequence Diagram, semua komponen terlibat perlu dicapai.

Bagi keperluan Reka Bentuk NIISe, satu transaksi lengkap akan melibatkan komponen berikut:
i. API
ii. Integrasi Dalaman (across internal modules)
iii. Integrasi Luaran (sistem agensi luar)
iv. Keperluan untuk jana notifikasi ke dashboard aktor yang terlibat
v. Pangkalan Data

Expected:
Sequence Diagram perlu ada lifeline berikut:
i. lifeline API
ii. lifeline integrasi dalaman
iii. lifeline integrasi Luaran
iv lifeline webserver (untuk jana notifikasi ke dashboard aktor dan jana error code message)
v. lifeline Pangkalan Data`,
        referenceCode: "KM123",
        classification: "Baharu (New)",
        isComplete: false,
        errorCategory: "Tidak Betul (Incorrect)",
        notes: ""
      },
    ],
  };
};

const handleFileChange = async (event) => {

    const selectedFile = event.target.files[0];
    console.log("documentFile:", selectedFile);

    if (selectedFile) {
        documentFile.value = selectedFile;
        console.log("Selected file:", selectedFile.name); // Debugging: Log the file name
    } else {
        documentFile.value = null; // Reset if no file is selected
    }
};

// Handle document upload
const uploadDocument = () => {
    
  if (!documentType.value) {
    alert("Please select a document type.");
    return;
  } 
  // Check if a file is selected
  if (!documentFile.value) {
    alert("Please select a file to upload.");
    return;
  } 
   // Simulate file upload and validation
  console.log("Uploaded document:", documentFile.value.name);
  dummyValidation();
};

// Track the editable state
const isEditing = ref(false); // Controls edit mode

// Edit Checklist
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

// Save checklist to Excel
const exportToExcel = () => {
  const fileUrl = '/Borang_Maklumbalas.xlsx'; // Path to the file in the public folder
  saveAs(fileUrl, 'Borang_Maklumbalas.xlsx');
};

// Save changes (if necessary)
const saveChanges = () => {
  alert("Changes saved successfully!");
  toggleEdit();
};

// Add a new row to the checklist
const addNewRow = () => {
  validationResult.value.checklist.push({
    section: "",
    details: "",
    referenceCode: "",
    classification: "",
    isComplete: false,
    errorCategory: "",
    notes: ""
  });
};

// Delete a row from the checklist
const deleteRow = (index) => {
  validationResult.value.checklist.splice(index, 1);
};

const docType = [
    "URS - Spesifikasi Keperluan Pengguna",
    "SRS - Spesifikasi Keperluan Sistem",
    "SDS - Spesifikasi Reka Bentuk Sistem",
    "SDD - Spesifikasi Reka Bentuk Data",
    "Manual Pengguna",
    "Skrip Ujian"
];

const columnNames = ref({
  section: "Lokasi (Muka Surat / Seksyen)",
  details: "Perincian Semakan",
  referenceCode: "Kod Rujukan KM",
  classification: "Klasifikasi Penemuan",
  errorCategory: "Kategori Kesalahan",
  notes: "Catatan"
});

const saveColumnNames = () => {
  alert("Column names saved successfully!");
};

const errorCategories = ["BAHARU (NEW) TIDAK BETUL (INCORRECT)", "Tidak Betul (Incorrect)"];
const classifications = ["MAJOR", "MINOR"];

// Add these refs
const showModal = ref(false);
const projectForm = ref({
  namaProjek: '',
  kodProjek: '',
  tarikhMula: '',
  tarikhTamat: '',
  statusProjek: '',
  pemilikProjek: ''
});

// Add these methods
const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  // Reset form
  projectForm.value = {
    namaProjek: '',
    kodProjek: '',
    tarikhMula: '',
    tarikhTamat: '',
    statusProjek: '',
    pemilikProjek: ''
  };
};

const submitProject = async () => {
  try {
    // Add your API call here to save the project
    // Example:
    // await $fetch('/api/projects', {
    //   method: 'POST',
    //   body: projectForm.value
    // });
    
    alert('Projek berjaya ditambah!');
    closeModal();
    // Optionally refresh the projects list
  } catch (error) {
    console.error('Error adding project:', error);
    alert('Ralat semasa menambah projek');
  }
};

const statusOptions = [
  'Aktif',
  'Selesai',
  'Ditangguhkan',
  'Dibatalkan'
];
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Add Project Button -->
    <!-- <div class="mb-4">
      <rs-button @click="openModal">
        <Icon name="material-symbols:add" class="mr-2"></Icon>
        Tambah Projek
      </rs-button>
    </div> -->

    <!-- Project Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Tambah Projek Baharu</h2>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
              <Icon name="material-symbols:close" size="24"></Icon>
            </button>
          </div>

          <form @submit.prevent="submitProject" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormKit
                type="text"
                v-model="projectForm.namaProjek"
                label="Nama Projek"
                validation="required"
                :validation-messages="{
                  required: 'Nama projek diperlukan'
                }"
              />

              <FormKit
                type="text"
                v-model="projectForm.kodProjek"
                label="Kod Projek"
                validation="required"
                :validation-messages="{
                  required: 'Kod projek diperlukan'
                }"
              />

              <FormKit
                type="date"
                v-model="projectForm.tarikhMula"
                label="Tarikh Mula"
                validation="required"
                :validation-messages="{
                  required: 'Tarikh mula diperlukan'
                }"
              />

              <FormKit
                type="date"
                v-model="projectForm.tarikhTamat"
                label="Tarikh Tamat"
                validation="required"
                :validation-messages="{
                  required: 'Tarikh tamat diperlukan'
                }"
              />

              <FormKit
                type="select"
                v-model="projectForm.statusProjek"
                :options="statusOptions"
                label="Status Projek"
                validation="required"
                :validation-messages="{
                  required: 'Status projek diperlukan'
                }"
              />

              <FormKit
                type="text"
                v-model="projectForm.pemilikProjek"
                label="Pemilik Projek"
                validation="required"
                :validation-messages="{
                  required: 'Pemilik projek diperlukan'
                }"
              />
            </div>

            <div class="flex justify-end space-x-4 mt-6">
              <rs-button type="button" variant="secondary" @click="closeModal">
                Batal
              </rs-button>
              <rs-button type="submit">
                <Icon name="material-symbols:save" class="mr-2"></Icon>
                Simpan Projek
              </rs-button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- File Upload Card -->
    <rs-card class="mb-6 shadow-lg rounded-lg">
      <template #header>
        <h2 class="text-xl font-bold text-gray-800">Pengimbas Dokumen Kendiri</h2>
      </template>

      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormKit
            type="select"
            v-model="documentType"
            label="Jenis Dokumen"
            placeholder="Pilih Jenis Dokumen"
            :options="docType"
            validation="required"
            class="w-full"
          />
          <FormKit
            type="file"
            id="document"
            label="Muat Naik Dokumen"
            accept=".pdf,.docx"
            @change="(e) => handleFileChange(e)"
            class="w-full"
          />
        </div>

        <!-- Upload Button -->
        <div class="flex justify-end mt-4">
          <rs-button
            @click.prevent="uploadDocument"
          >
          <Icon name="material-symbols:check" class="mr-2" title="Padam"></Icon>
            Sahkan Dokumen
          </rs-button>
        </div>
      </template>
    </rs-card>

    <!-- Validation Results Card -->
    <rs-card v-if="validationResult" class="shadow-lg rounded-lg">
      <template #header>
        <h3 class="text-xl font-bold text-gray-800">Keputusan Pengesahan</h3>
      </template>

      <template #body>
        <!-- Health Meter -->
        <div class="mb-6">
          <h4 class="font-medium text-gray-700">Meter Kesihatan:</h4>
          <div class="flex items-center space-x-4 mt-2">
            <span class="text-lg font-semibold">{{ validationResult.score }}% Selesai</span>
            <div class="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                class="h-4 rounded-full"
                :style="{ width: validationResult.score + '%', backgroundColor: validationResult.color }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Readiness Checklist -->
        <div >
          <h4 class="font-medium mb-4 flex justify-between items-center text-gray-700">
            Senarai Semak Kesediaan:
            <rs-button v-if="!isEditing"
              class="text-sm"
              @click="toggleEdit"
            >
              {{ "Edit Senarai Semak" }}
            </rs-button>
          </h4>
          <!-- Editable or View-Only Checklist -->
          <div v-if="isEditing">
           <rs-card class="p-4">
            <div class="mb-4">
              <h5 class="font-medium text-gray-700 ml-6 mb-2">Edit Checklist:</h5>
              <div class="overflow-x-auto">
                <div class="max-h-150 overflow-y-auto">
                  <table class="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th class="py-2 px-4 border-b">{{ columnNames.section }}</th>
                        <th class="py-2 px-4 border-b">{{ columnNames.details }}</th>
                        <th class="py-2 px-4 border-b">{{ columnNames.referenceCode }}</th>
                        <th class="py-2 px-4 border-b">{{ columnNames.classification }}</th>
                        <th class="py-2 px-4 border-b">{{ columnNames.errorCategory }}</th>
                        <th class="py-2 px-4 border-b">{{ columnNames.notes }}</th>
                        <th class="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in validationResult.checklist" :key="index">
                        <td class="py-2 px-4 border-b">
                          <input
                            type="text"
                            class="border rounded-lg px-2 py-1 w-full"
                            v-model="item.section"
                          />
                        </td>
                        <td class="py-2 px-4 border-b">
                          <textarea
                            class="border rounded-lg px-2 py-1 w-full h-32"
                            v-model="item.details"
                          ></textarea>
                        </td>
                        <td class="py-2 px-4 border-b">
                          <input
                            type="text"
                            class="border rounded-lg px-2 py-1 w-full"
                            v-model="item.referenceCode"
                          />
                        </td>
                        <td class="py-2 px-4 border-b">
                          <select
                            class="border rounded-lg px-2 py-1 w-full"
                            v-model="item.classification"
                          >
                            <option v-for="option in classifications" :key="option" :value="option">
                              {{ option }}
                            </option>
                          </select>
                        </td>
                        <td class="py-2 px-4 border-b">
                          <select
                            class="border rounded-lg px-2 py-1 w-full"
                            v-model="item.errorCategory"
                          >
                            <option v-for="option in errorCategories" :key="option" :value="option">
                              {{ option }}
                            </option>
                          </select>
                        </td>
                        <td class="py-2 px-4 border-b">
                          <input
                            type="text"
                            class="border rounded-lg px-2 py-1 w-full"
                            v-model="item.notes"
                          />
                        </td>
                        <td class="py-2 px-4 border-b">
                          <rs-button class="text-red-500" @click="deleteRow(index)">
                            <Icon name="material-symbols:delete" class="mr-2"></Icon>
                            Padam
                          </rs-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="flex justify-center mt-4">
                <rs-button class="w-full py-4" @click="addNewRow">
                  <Icon name="material-symbols:add" class="mr-2" title="Tambah"></Icon>
                  Tambah Baris Baharu
                </rs-button>
              </div>
            </div>
            <div class="flex justify-end mt-4">
              <rs-button @click="saveChanges">
                <Icon name="material-symbols:save" class="mr-2" title="Simpan"></Icon>
                Simpan Perubahan
              </rs-button>
            </div>
           </rs-card>
          </div>
          <div v-else class="overflow-x-auto">
            <div class="max-h-150 overflow-y-auto">
              <table class="min-w-full bg-white">
                <thead>
                  <tr>
                    <th class="py-2 px-4 border-b">{{ columnNames.section }}</th>
                    <th class="py-2 px-4 border-b">{{ columnNames.details }}</th>
                    <th class="py-2 px-4 border-b">{{ columnNames.referenceCode }}</th>
                    <th class="py-2 px-4 border-b">{{ columnNames.classification }}</th>
                    <th class="py-2 px-4 border-b">{{ columnNames.errorCategory }}</th>
                    <th class="py-2 px-4 border-b">{{ columnNames.notes }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in validationResult.checklist" :key="index">
                    <td class="py-2 px-4 border-b">{{ item.section }}</td>
                    <td class="py-2 px-4 border-b whitespace-pre-line">{{ item.details }}</td>
                    <td class="py-2 px-4 border-b">{{ item.referenceCode }}</td>
                    <td class="py-2 px-4 border-b">{{ item.classification }}</td>
                    <td class="py-2 px-4 border-b">{{ item.errorCategory }}</td>
                    <td class="py-2 px-4 border-b">{{ item.notes }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- <div class="flex space-x-4 mt-6 justify-end" v-if="validationResult">
              <rs-button
                @click="exportToExcel"
              >
              <Icon name="material-symbols:file-export" class="mr-2" title="Eksport"></Icon>
                Eksport ke Excel
              </rs-button>
            </div> -->
          </div>
        </div>
      </template>
    </rs-card>
  </div>
</template>
