<script setup>
definePageMeta({
  title: "Document Repository",
  layout: "default",
  middleware: ["auth"], // Ensure only authenticated users can access
});

// Dummy Data for Documents
const documents = ref([
  {
    id: 1,
    fileName: "Project-Plan.pdf",
    uploadDate: "2024-12-01",
    validationStatus: "Validated",
    projectName: "Project Alpha",
    documentType: "Project Plan",
    versions: [
      { number: 1, date: "2024-11-15" },
      { number: 2, date: "2024-11-20" },
      { number: 3, date: "2024-12-01" },
    ],
  },
  {
    id: 2,
    fileName: "Design-Specification.docx",
    uploadDate: "2024-12-01",
    validationStatus: "Pending",
    projectName: "Project Beta",
    documentType: "Design Specification",
    versions: [
      { number: 1, date: "2024-11-10" },
      { number: 2, date: "2024-12-01" },
    ],
  },
  {
    id: 3,
    fileName: "Team-Roster.pdf",
    uploadDate: "2024-11-30",
    validationStatus: "Validated",
    projectName: "Project Gamma",
    documentType: "Team Roster",
    versions: [
      { number: 1, date: "2024-11-01" },
      { number: 2, date: "2024-11-15" },
      { number: 3, date: "2024-11-30" },
    ],
  },
  {
    id: 4,
    fileName: "Requirements-Document.pdf",
    uploadDate: "2024-12-02",
    validationStatus: "Pending",
    projectName: "Project Alpha",
    documentType: "Requirements Document",
    versions: [
      { number: 1, date: "2024-12-02" },
    ],
  },
  {
    id: 5,
    fileName: "Test-Plan.docx",
    uploadDate: "2024-12-03",
    validationStatus: "Validated",
    projectName: "Project Beta",
    documentType: "Test Plan",
    versions: [
      { number: 1, date: "2024-12-03" },
    ],
  },
  {
    id: 6,
    fileName: "User-Manual.pdf",
    uploadDate: "2024-12-04",
    validationStatus: "Pending",
    projectName: "Project Gamma",
    documentType: "User Manual",
    versions: [
      { number: 1, date: "2024-12-04" },
    ],
  },
  {
    id: 7,
    fileName: "Risk-Assessment.pdf",
    uploadDate: "2024-12-05",
    validationStatus: "Pending",
    projectName: "Project Alpha",
    documentType: "Risk Assessment",
    versions: [
      { number: 1, date: "2024-12-05" },
    ],
  },
  {
    id: 8,
    fileName: "Budget-Report.xlsx",
    uploadDate: "2024-12-06",
    validationStatus: "Validated",
    projectName: "Project Beta",
    documentType: "Budget Report",
    versions: [
      { number: 1, date: "2024-12-06" },
    ],
  },
  {
    id: 9,
    fileName: "Meeting-Minutes.docx",
    uploadDate: "2024-12-07",
    validationStatus: "Pending",
    projectName: "Project Gamma",
    documentType: "Meeting Minutes",
    versions: [
      { number: 1, date: "2024-12-07" },
    ],
  },
  {
    id: 10,
    fileName: "Project-Closure.pdf",
    uploadDate: "2024-12-08",
    validationStatus: "Validated",
    projectName: "Project Alpha",
    documentType: "Project Closure",
    versions: [
      { number: 1, date: "2024-12-08" },
    ],
  },
  {
    id: 11,
    fileName: "Training-Materials.pptx",
    uploadDate: "2024-12-09",
    validationStatus: "Pending",
    projectName: "Project Beta",
    documentType: "Training Materials",
    versions: [
      { number: 1, date: "2024-12-09" },
    ],
  },
  {
    id: 12,
    fileName: "Stakeholder-Analysis.pdf",
    uploadDate: "2024-12-10",
    validationStatus: "Validated",
    projectName: "Project Gamma",
    documentType: "Stakeholder Analysis",
    versions: [
      { number: 1, date: "2024-12-10" },
    ],
  },
]);

const selectedDocument = ref(null); // Document selected for version tracking
const showVersionModal = ref(false); // Toggles the version modal
const uploadForm = reactive({
  file: null,
  validationStatus: "Pending",
  projectName: "Project Alpha",
  documentType: "Project Plan", // Add documentType to the upload form
}); // Form state for document upload

const projectOptions = [
  { value: "Project Alpha", label: "Project Alpha" },
  { value: "Project Beta", label: "Project Beta" },
  { value: "Project Gamma", label: "Project Gamma" },
];

const documentTypeOptions = [
  { value: "Project Plan", label: "Project Plan" },
  { value: "Design Specification", label: "Design Specification" },
  { value: "Team Roster", label: "Team Roster" },
  { value: "Requirements Document", label: "Requirements Document" },
  { value: "Test Plan", label: "Test Plan" },
  { value: "User Manual", label: "User Manual" },
];

const filterProjectOptions = [
  { value: "", label: "All" },
  ...projectOptions,
];

const filterDocumentTypeOptions = [
  { value: "", label: "All" },
  ...documentTypeOptions,
];

const filterValidationStatusOptions = [
  { value: "", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Validated", label: "Validated" },
];

const filter = reactive({
  projectName: "",
  documentType: "",
  validationStatus: "", // Add validationStatus to the filter state
});

const filteredDocuments = computed(() => {
  return documents.value.filter(doc => {
    const matchesProject = filter.projectName ? doc.projectName === filter.projectName : true;
    const matchesType = filter.documentType ? doc.documentType === filter.documentType : true;
    const matchesStatus = filter.validationStatus ? doc.validationStatus === filter.validationStatus : true;
    return matchesProject && matchesType && matchesStatus;
  });
});

const sortedDocumentsByProject = computed(() => {
  if (filter.projectName) {
    return { [filter.projectName]: filteredDocuments.value };
  }

  const grouped = filteredDocuments.value.reduce((acc, doc) => {
    if (!acc[doc.projectName]) {
      acc[doc.projectName] = [];
    }
    acc[doc.projectName].push(doc);
    return acc;
  }, {});

  Object.keys(grouped).forEach(project => {
    grouped[project].sort((a, b) => a.documentType.localeCompare(b.documentType));
  });

  return grouped;
});

const collapsedProjects = reactive({});

const toggleProjectCollapse = (projectName) => {
  collapsedProjects[projectName] = !collapsedProjects[projectName];
};

// Handle document upload (dummy function)
const handleUpload = async () => {
  if (!uploadForm.file) {
    alert("Please select a file to upload.");
    return;
  }

  
  // Simulate document upload
  const newDocument = {
    id: documents.value.length + 1,
    fileName: uploadForm.file.name,
    uploadDate: new Date().toISOString().split("T")[0],
    validationStatus: uploadForm.validationStatus,
    projectName: uploadForm.projectName,
    documentType: uploadForm.documentType,
    versions: [
      {
        number: 1,
        date: new Date().toISOString().split("T")[0],
      },
    ],
  };
  showModal.value = false;
  documents.value.push(newDocument);
  uploadForm.file = null;
  uploadForm.projectName = "";
  uploadForm.documentType = "";
};

// Open version modal
const openVersionModal = (document) => {
  selectedDocument.value = document;
  showVersionModal.value = true;
};

// Close version modal
const closeVersionModal = () => {
  selectedDocument.value = null;
  showVersionModal.value = false;
};

const showModal = ref(false);
const showModalHideOverlay = ref(false);

// Dummy health meter value
const healthMeter = ref(50); // Set a dummy value of 75%
</script>

<template>
    <div>
        <LayoutsBreadcrumb />
        <div class="h-full">
            <!-- Document Upload Form -->
            <rs-card class="mb-2"> <!-- Reduced margin-bottom -->
                <template #header>
                    <h3 class="text-lg font-semibold">Upload Document</h3>
                </template>
                <template #body>
                    <form @submit.prevent="handleUpload" class="space-y-2"> 
                        <!-- File Input -->
                        <FormKit
                            type="file"
                            name="file"
                            label="Select a PDF or DOCX File"
                            validation="required"
                            accept=".pdf,.docx"
                            v-model="uploadForm.file"
                            :help="`Allowed types: PDF, DOCX`"
                            :validation-visibility="'blur'"
                            class="text-sm"
                        />
                        <div class="grid grid-cols-3 gap-2"> 
                            <!-- Project Name Dropdown -->
                            <FormKit
                                type="select"
                                name="projectName"
                                label="Project Name"
                                :options="projectOptions"
                                validation="required"
                                v-model="uploadForm.projectName"
                                class="text-sm" 
                            />
                            <!-- Validation Status -->
                            <FormKit
                                type="select"
                                name="validationStatus"
                                label="Validation Status"
                                :options="[{ value: 'Pending', label: 'Pending' }, { value: 'Validated', label: 'Validated' }]"
                                validation="required"
                                v-model="uploadForm.validationStatus"
                                class="text-sm"
                            />
                            <!-- Document Type Dropdown -->
                            <FormKit
                                type="select"
                                name="documentType"
                                label="Document Type"
                                :options="documentTypeOptions"
                                validation="required"
                                v-model="uploadForm.documentType"
                                class="text-sm" 
                            />
                        </div>
                        <!-- Submit Button -->
                        <div class="flex justify-end">
                            <rs-button
                                type="submit"
                                class="px-3 py-1 bg-[#0D1B2A] text-white font-semibold rounded hover:bg-blue-600" 
                                @click="showModal = true"
                            >
                                <Icon name="material-symbols:upload-rounded" class="mr-2"></Icon>
                                Upload Document
                            </rs-button>
                            <!-- Upload Document Modal -->
                            <rs-modal title="Checking Document Content" size="lg" position="center" v-model="showModal" ok-only ok-title="Proceed to Upload" :ok-callback="handleUpload">
                                <!-- Health Meter -->
                                <div class="mb-2 p-2"> <!-- Reduced margin-bottom -->
                                    <label class="block text-sm font-medium text-gray-700">Health Meter</label>
                                    <div class="w-full bg-gray-200 rounded-md h-8">
                                        <div
                                            class="bg-green-500 h-8 rounded-md"
                                            :style="{ width: `${healthMeter}%` }"
                                        ></div>
                                    </div>
                                    <span class="text-sm text-gray-500 text-right block">{{ healthMeter }}% Complete</span>
                                </div>
                                <div class="p-2 bg-slate-200 rounded-md"> <!-- Reduced padding -->
                                    <table class="w-full bg-white rounded-md shadow-md">
                                        <thead class="bg-gray-100">
                                            <tr>
                                                <th class="px-4 py-2 text-left">Document Criteria</th>
                                                <th class="px-4 py-2 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200">
                                            <tr>
                                                <td class="flex items-center px-4 py-2">
                                                    <span class="flex-1">Title</span>
                                                </td>
                                                <td class="text-right px-4 py-2">
                                                    <Icon name="material-symbols:check-circle" class="ml-2 text-green-500"></Icon>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="flex items-center px-4 py-2">
                                                    <span class="flex-1">Introduction</span>
                                                </td>
                                                <td class="text-right px-4 py-2">
                                                    <Icon name="material-symbols:check-circle" class="ml-2 text-green-500"></Icon>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="flex items-center px-4 py-2">
                                                    <span class="flex-1">Conclusion</span>
                                                </td>
                                                <td class="text-right px-4 py-2">
                                                    <Icon name="svg-spinners:180-ring" class="ml-2 "></Icon>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="flex items-center px-4 py-2">
                                                    <span class="flex-1">References</span>
                                                </td>
                                                <td class="text-right px-4 py-2">
                                                    <Icon name="material-symbols:cancel" class="ml-2 text-red-500"></Icon>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </rs-modal>
                        </div>
                    </form>
                </template>
            </rs-card>
            <!-- Document List -->
            <rs-card class="h-full">
                <template #header>
                    <h3 class="text-lg font-semibold">Uploaded Documents List</h3>
                </template>
                <template #body>
                    <!-- Filters -->
                    <div class="grid grid-cols-3 gap-4 mb-4 items-center border p-3 rounded-md">
                        <FormKit
                            type="select"
                            name="filterProjectName"
                            label="Filter by Project Name"
                            :options="filterProjectOptions"
                            v-model="filter.projectName"
                        />
                        <FormKit
                            type="select"
                            name="filterDocumentType"
                            label="Filter by Document Type"
                            :options="filterDocumentTypeOptions"
                            v-model="filter.documentType"
                        />
                        <FormKit
                            type="select"
                            name="filterValidationStatus"
                            label="Filter by Validation Status"
                            :options="filterValidationStatusOptions"
                            v-model="filter.validationStatus"
                        />
                    </div>
                    <rs-card class="p-4 h-full" style="max-height: 55vh; overflow-y: auto;">
                        <div v-for="(docs, projectName) in sortedDocumentsByProject" :key="projectName">
                            <div class="flex justify-between items-center mb-4 border-b-4 cursor-pointer" @click="toggleProjectCollapse(projectName)">
                                <h4 class="text-lg font-semibold">{{ projectName }}</h4>
                                <div class="flex items-center">
                                    <span class="text-sm text-gray-500 mr-2">
                                        {{ docs.length === 0 ? 'No Document' : docs.length === 1 ? '1 Document' : `${docs.length} Documents` }}
                                    </span>
                                    <Icon :name="collapsedProjects[projectName] ? 'material-symbols:expand-more' : 'material-symbols:expand-less'" />
                                </div>
                            </div>
                            <div v-show="!collapsedProjects[projectName]" style="max-height: 40vh; overflow-y: auto;">
                                <table class="table-auto w-full border-collapse border border-gray-200 mb-4">
                                    <thead>
                                        <tr class="bg-gray-100">
                                            <th class="px-4 py-2 text-left border border-gray-200">Project Name</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">File Name</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">Document Type</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">Upload Date</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">Validation Status</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="doc in docs" :key="doc.id" class="hover:bg-gray-50">
                                            <td class="px-4 py-2 border border-gray-200">{{ doc.projectName }}</td>
                                            <td class="px-4 py-2 border border-gray-200">{{ doc.fileName }}</td>
                                            <td class="px-4 py-2 border border-gray-200">{{ doc.documentType }}</td>
                                            <td class="px-4 py-2 border border-gray-200">{{ doc.uploadDate }}</td>
                                            <td class="px-4 py-2 border border-gray-200">
                                                <rs-badge :variant="doc.validationStatus === 'Validated' ? 'success' : 'warning'">
                                                    {{ doc.validationStatus === 'Validated' ? 'Validated' : 'Pending' }}
                                                </rs-badge>
                                            </td>
                                            <td class="px-4 py-2 border border-gray-200 space-x-2">
                                                <NuxtLink
                                                    :to="`/document-management/view?id=${doc.id}`"
                                                    class="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                                >
                                                    View
                                                </NuxtLink>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </rs-card>
                </template>
            </rs-card>
        </div>
        <!-- Document Versions Modal -->
        <rs-modal v-model="showVersionModal" @close="closeVersionModal">
            <template #header>
                <h3 class="text-lg font-semibold">Document Versions</h3>
            </template>
            <template #body>
                <ul class="list-disc list-inside">
                    <li
                        v-for="(version, index) in selectedDocument.versions"
                        :key="index"
                        class="py-2"
                    >
                        Version {{ version.number }} - {{ version.date }}
                        <button
                            class="ml-4 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                            @click="alert(`Downloading version ${version.number}...`)"
                        >
                            Download
                        </button>
                    </li>
                </ul>
            </template>
        </rs-modal>
    </div>
</template>
