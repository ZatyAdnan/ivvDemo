<script setup>
definePageMeta({
  title: "Pengimbas Dokumen Kendiri",
  layout: "default",
  middleware: ["auth"], // Memastikan pengguna telah log masuk
});

import { ref } from "vue";
import { saveAs } from "file-saver"; // For saving files
import * as XLSX from "xlsx"; // For Excel export
import jsPDF from "jspdf"; // For PDF export

// Refs to handle the file and validation result
const documentType = ref(null);
const documentFile = ref(null); // Stores the selected file
const validationResult = ref(null); // Stores the validation result
validationResult.value = {
    score: 72, // Skor Meter Kesihatan (0-100)
    color: "yellow", // Warna Meter Kesihatan berdasarkan skor
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
// Dummy validation logic
const dummyValidation = () => {
  validationResult.value = {
    score: 72, // Skor Meter Kesihatan (0-100)
    color: "yellow", // Warna Meter Kesihatan berdasarkan skor
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
    console.log("Fail dokumen:", selectedFile);

    if (selectedFile) {
        documentFile.value = selectedFile;
        console.log("Fail dipilih:", selectedFile.name);
    } else {
        documentFile.value = null; // Tetapkan semula jika tiada fail dipilih
    }
};

// Handle document upload
const uploadDocument = () => {
    
  if (!documentType.value) {
    alert("Sila pilih jenis dokumen.");
    return;
  } 
  if (!documentFile.value) {
    alert("Sila pilih fail untuk dimuat naik.");
    return;
  } 
  console.log("Dokumen dimuat naik:", documentFile.value.name);
  dummyValidation();
};

// Track the editable state
const isEditing = ref(false); // Kawalan mod sunting
const isEditingDoc = ref(false); // Kawalan mod sunting untuk Maklumat Dokumen

// Document information state
const documentInfo = ref({
  namaDeliverable: "SPESIFIKASI REKA BENTUK SISTEM (SDS) MODUL PENGURUSAN KESELAMATAN SUBMODUL FORENSIK",
  idDokumen: "SDS-01",
  versiDokumen: "1.0",
  fasa: "REKA BENTUK",
  produkKerja: "D-REKA BENTUK SISTEM",
  bilMukaSurat: "150",
  namaPenyemak: "Shariah Ibrahim, Prisilia",
  tarikhSemakan: "7 Jan 2025 - 13 Jan 2025",
  sesiSemakan: "1",
  bilKmTidakPatuh: "0"
});

// Toggle document edit mode
const toggleDocEdit = () => {
  isEditingDoc.value = !isEditingDoc.value;
};

// Save document changes
const saveDocChanges = () => {
  alert("Perubahan maklumat dokumen berjaya disimpan!");
  toggleDocEdit();
};

// Edit Checklist
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

// Save document changes
const saveChanges = () => {
  alert("Perubahan berjaya disimpan!");
  toggleEdit();
};

// Save checklist to Excel
const exportToExcel = () => {
  const fileUrl = '/Borang_Maklumbalas.xlsx';
  saveAs(fileUrl, 'Borang_Maklumbalas.xlsx');
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

const handleSubmit = () => {
  alert("Dokumen telah dihantar untuk semakan!");
};
</script>

<template>
  <div class="p-6 bg-gray-100 ">
    <!-- Kad Maklumat Dokumen -->
    <rs-card class="shadow-lg rounded-lg mb-6">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold text-gray-800">Maklumat Dokumen</h3>
          <div class="flex gap-2">
            <rs-button
              class="text-sm"
              @click="toggleDocEdit"
            >
              {{ isEditingDoc ? "Selesai Menyunting" : "Sunting Maklumat" }}
            </rs-button>
            <rs-button
              v-if="isEditingDoc"
              class="text-sm bg-blue-600"
              @click="saveDocChanges"
            >
              Simpan
            </rs-button>
          </div>
        </div>
      </template>

      <template #body>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-medium">Nama Deliverable:</p>
            <div v-if="isEditingDoc">
              <textarea
                v-model="documentInfo.namaDeliverable"
                class="w-full border rounded-lg px-2 py-1"
                rows="3"
              ></textarea>
            </div>
            <p v-else>{{ documentInfo.namaDeliverable }}</p>
          </div>
          <div>
            <p class="font-medium">ID Dokumen:</p>
            <div v-if="isEditingDoc">
              <input
                type="text"
                v-model="documentInfo.idDokumen"
                class="w-full border rounded-lg px-2 py-1"
              />
            </div>
            <p v-else>{{ documentInfo.idDokumen }}</p>
          </div>
          <div>
            <p class="font-medium">Versi Dokumen:</p>
            <div v-if="isEditingDoc">
              <input
                type="text"
                v-model="documentInfo.versiDokumen"
                class="w-full border rounded-lg px-2 py-1"
              />
            </div>
            <p v-else>{{ documentInfo.versiDokumen }}</p>
          </div>
          <div>
            <p class="font-medium">Fasa:</p>
            <div v-if="isEditingDoc">
              <input
                type="text"
                v-model="documentInfo.fasa"
                class="w-full border rounded-lg px-2 py-1"
              />
            </div>
            <p v-else>{{ documentInfo.fasa }}</p>
          </div>
          <div>
            <p class="font-medium">Produk Kerja:</p>
            <div v-if="isEditingDoc">
              <input
                type="text"
                v-model="documentInfo.produkKerja"
                class="w-full border rounded-lg px-2 py-1"
              />
            </div>
            <p v-else>{{ documentInfo.produkKerja }}</p>
          </div>
          <div>
            <p class="font-medium">Bil. Muka Surat Keseluruhan:</p>
            <div v-if="isEditingDoc">
              <input
                type="number"
                v-model="documentInfo.bilMukaSurat"
                class="w-full border rounded-lg px-2 py-1"
              />
            </div>
            <p v-else>{{ documentInfo.bilMukaSurat }}</p>
          </div>
          <div>
            <p class="font-medium">Nama Penyemak:</p>
            <div v-if="isEditingDoc">
              <input
                type="text"
                v-model="documentInfo.namaPenyemak"
                class="w-full border rounded-lg px-2 py-1"
              />
            </div>
            <p v-else>{{ documentInfo.namaPenyemak }}</p>
          </div>
          <div>
            <p class="font-medium">Tarikh Semakan:</p>
            <div v-if="isEditingDoc">
              <input
                type="text"
                v-model="documentInfo.tarikhSemakan"
                class="w-full border rounded-lg px-2 py-1"
              />
            </div>
            <p v-else>{{ documentInfo.tarikhSemakan }}</p>
          </div>
          <div>
            <p class="font-medium">Sesi Semakan:</p>
            <div v-if="isEditingDoc">
              <input
                type="number"
                v-model="documentInfo.sesiSemakan"
                class="w-full border rounded-lg px-2 py-1"
              />
            </div>
            <p v-else>{{ documentInfo.sesiSemakan }}</p>
          </div>
          <div>
            <p class="font-medium">Bil. KM Tidak Patuh:</p>
            <div v-if="isEditingDoc">
              <input
                type="number"
                v-model="documentInfo.bilKmTidakPatuh"
                class="w-full border rounded-lg px-2 py-1"
              />
            </div>
            <p v-else>{{ documentInfo.bilKmTidakPatuh }}</p>
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Kad Rumusan Status Hasil Semakan -->
    <rs-card class="shadow-lg rounded-lg mb-6">
      <template #header>
        <h3 class="text-xl font-bold text-gray-800">Rumusan Status Hasil Semakan</h3>
      </template>

      <template #body>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th class="border border-gray-300 px-4 py-2"></th>
                <th class="border border-gray-300 px-4 py-2">BAHARU (NEW)</th>
                <th class="border border-gray-300 px-4 py-2">BELUM SELESAI (OPEN)</th>
                <th class="border border-gray-300 px-4 py-2">SELESAI (CLOSED)</th>
                <th class="border border-gray-300 px-4 py-2">DITOLAK (REJECT)</th>
                <th class="border border-gray-300 px-4 py-2">JUMLAH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 font-medium">MAJOR</td>
                <td class="border border-gray-300 px-4 py-2 text-center">2</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">2</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 font-medium">MINOR</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 font-medium">RALAT DOKUMEN</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 font-medium">JUMLAH</td>
                <td class="border border-gray-300 px-4 py-2 text-center">2</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">0</td>
                <td class="border border-gray-300 px-4 py-2 text-center">2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </rs-card>

    <!-- Kad Keputusan Pengesahan -->
    <rs-card v-if="validationResult" class="shadow-lg rounded-lg">
      <template #header>
        <h3 class="text-xl font-bold text-gray-800">Keputusan Pengesahan</h3>
      </template>

      <template #body>
        <!-- Meter Kesihatan -->
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

        <!-- Senarai Semak Kesediaan -->
        <div>
          <h4 class="font-medium mb-4 flex justify-between items-center text-gray-700">
            Senarai Semak Kesediaan:
            <div class="flex gap-2">
              <rs-button
                class="text-sm"
                @click="toggleEdit"
              >
                {{ isEditing ? "Selesai Menyunting" : "Sunting Senarai Semak" }}
              </rs-button>
              <rs-button v-if="!isEditing"
                class="text-sm bg-blue-600"
                @click="handleSubmit"
              >
                Hantar
              </rs-button>
            </div>
          </h4>
          <!-- Editable or View-Only Checklist -->
          <div v-if="isEditing">
           <rs-card class="p-4">
            <div class="mb-4">
              <h5 class="font-medium text-gray-700 ml-6 mb-2">Edit Checklist:</h5>
              <div class="overflow-x-auto">
                <div class="max-h-96 overflow-y-auto">
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
                            Delete
                          </rs-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="flex justify-center mt-4">
                <rs-button class="w-full py-4" @click="addNewRow">
                  <Icon name="material-symbols:add" class="mr-2" title="Padam"></Icon>
                  Tambah Baris Baharu
                </rs-button>
              </div>
            </div>
            <div class="flex justify-end mt-4">
              <rs-button @click="saveChanges">
                <Icon name="material-symbols:save" class="mr-2" title="Padam"></Icon>
                Simpan Perubahan
              </rs-button>
            </div>
           </rs-card>
          </div>
          <div v-else class="overflow-x-auto">
            <div class="max-h-96 overflow-y-auto">
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
            <div class="flex space-x-4 mt-6 justify-end" v-if="validationResult">
              <rs-button @click="exportToExcel">
                <Icon name="material-symbols:file-export" class="mr-2" title="Eksport"></Icon>
                Eksport ke Excel
              </rs-button>
            </div>
          </div>
        </div>
      </template>
    </rs-card>
  </div>
</template>
