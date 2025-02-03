<script setup>
definePageMeta({
  title: "Upload Document",
  layout: "default",
  middleware: ["auth"], // Ensure only authenticated users can access
});

const documentTypeOptions = [
  { value: "Project Plan", label: "Project Plan" },
  { value: "Design Specification", label: "Design Specification" },
  { value: "Team Roster", label: "Team Roster" },
  { value: "Requirements Document", label: "Requirements Document" },
  { value: "Test Plan", label: "Test Plan" },
  { value: "User Manual", label: "User Manual" },
];

const generateComment = (percentage) => {
  const percent = parseInt(percentage);
  if (percent < 50) {
    return "Dokumen ini sedang dalam proses penyediaan dan memerlukan maklumat tambahan.";
  } else if (percent < 75) {
    return "Dokumen ini telah disemak tetapi memerlukan beberapa pembetulan.";
  } else if (percent < 100) {
    return "Dokumen ini hampir lengkap tetapi memerlukan beberapa ujian tambahan.";
  } else {
    return "Dokumen ini telah lengkap dan disahkan.";
  }
};

const filenames = [
  "Pelan-Projek.pdf",
  "Spesifikasi-Reka-Bentuk.docx",
  "Senarai-Pasukan.xlsx",
  "Dokumen-Keperluan.pdf",
  "Pelan-Ujian.docx",
  "Manual-Pengguna.pdf",
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const documents = ref(Array.from({ length: 10 }, (_, id) => {
  const percentage = `${Math.floor(Math.random() * 100) + 1}%`;
  return {
    id: id + 1,
    filename: getRandomElement(filenames),
    documentType: getRandomElement(documentTypeOptions).value,
    percentage,
    comment: generateComment(percentage),
  };
}));

const totalDocuments = computed(() => documents.value.length);

const averagePercentage = computed(() => {
  const total = documents.value.reduce((sum, doc) => sum + parseInt(doc.percentage), 0);
  return (total / documents.value.length).toFixed(2);
});

onMounted(() => {
  setTimeout(() => {
    changeKey.value++;
  }, 500);
});
</script>

<template>
    <div>
        <LayoutsBreadcrumb />
        <div class="h-full">
            <!-- Document List -->
            <rs-card class="h-full">
                <template #header>
                </template>
                <template #body>
                    <div class="flex justify-between mb-4 border-b-4">
                        <h3 class="text-lg font-semibold">Upload Documents</h3>
                        <NuxtLink to="/self-scanner">
                            <rs-button class="px-4 py-1 mb-2">
                                <Icon name="material-symbols:add" class="mr-2"></Icon>
                                Upload New Document
                            </rs-button>
                        </NuxtLink>
                    </div>
                    <rs-card class="p-4 h-full" style="max-height: 55vh; ">
                       
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <rs-card class="p-4">
                                <h4 class="text-lg font-semibold mb-2">Total Uploaded Documents</h4>
                                <p class="text-2xl">{{ totalDocuments }}</p>
                            </rs-card>
                            <rs-card class="p-4">
                                <h4 class="text-lg font-semibold mb-2">Average Document Percentage</h4>
                                <p class="text-2xl">{{ averagePercentage }}%</p>
                            </rs-card>
                        </div>
                        <h3 class="text-lg font-semibold mb-2 ml-2">Upload History</h3>
                        <div style="max-height: 30vh; overflow-y: auto;">
                            <table class="table-auto w-full border-collapse border border-gray-200 mb-4">
                                <thead>
                                    <tr class="bg-gray-100">
                                        <th class="px-4 py-2 text-left border border-gray-200">Filename</th>
                                        <th class="px-4 py-2 text-left border border-gray-200">Document Type</th>
                                        <th class="px-4 py-2 text-left border border-gray-200">Percentage</th>
                                        <th class="px-4 py-2 text-left border border-gray-200">Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="document in documents" :key="document.id" class="hover:bg-gray-50">
                                        <td class="px-4 py-2 border border-gray-200">{{ document.filename }}</td>
                                        <td class="px-4 py-2 border border-gray-200">{{ document.documentType }}</td>
                                        <td class="px-4 py-2 border border-gray-200">{{ document.percentage }}</td>
                                        <td class="px-4 py-2 border border-gray-200">{{ document.comment }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </rs-card>
                </template>
            </rs-card>
        </div>
    </div>
</template>
