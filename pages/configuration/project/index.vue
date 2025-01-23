<script setup>
definePageMeta({
  title: "Project Configuration",
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
    criteria: "Title: Project Plan\nIntroduction: Overview of the project\nConclusion: Summary of the project\nReferences: List of references used",
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
    criteria: "Title: Design Specification\nIntroduction: Design details\nConclusion: Design summary\nReferences: Design references",
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
    criteria: "Title: Team Roster\nIntroduction: Team members\nConclusion: Team summary\nReferences: Team references",
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
    criteria: "Title: Requirements Document\nIntroduction: Requirements overview\nConclusion: Requirements summary\nReferences: Requirements references",
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
    criteria: "Title: Test Plan\nIntroduction: Test details\nConclusion: Test summary\nReferences: Test references",
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
    criteria: "Title: User Manual\nIntroduction: User instructions\nConclusion: User summary\nReferences: User references",
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
    criteria: "Title: Risk Assessment\nIntroduction: Risk details\nConclusion: Risk summary\nReferences: Risk references",
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
    criteria: "Title: Budget Report\nIntroduction: Budget details\nConclusion: Budget summary\nReferences: Budget references",
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
    criteria: "Title: Meeting Minutes\nIntroduction: Meeting details\nConclusion: Meeting summary\nReferences: Meeting references",
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
    criteria: "Title: Project Closure\nIntroduction: Closure details\nConclusion: Closure summary\nReferences: Closure references",
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
    criteria: "Title: Training Materials\nIntroduction: Training details\nConclusion: Training summary\nReferences: Training references",
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
    criteria: "Title: Stakeholder Analysis\nIntroduction: Stakeholder details\nConclusion: Stakeholder summary\nReferences: Stakeholder references",
    versions: [
      { number: 1, date: "2024-12-10" },
    ],
  },
]);

const selectedDocument = ref(null); // Document selected for version tracking
const showVersionModal = ref(false); // Toggles the version modal

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

const filter = reactive({
  projectName: "",
  documentType: "",
});

const filteredDocuments = computed(() => {
  return documents.value.filter(doc => {
    const matchesProject = filter.projectName ? doc.projectName === filter.projectName : true;
    const matchesType = filter.documentType ? doc.documentType === filter.documentType : true;
    return matchesProject && matchesType;
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

const router = useRouter(); // Import useRouter from Vue Router
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
                        <div class="flex justify-end">
                            <rs-button
                                class="px-4 py-2"
                                @click="router.push('/configuration/project/add')" 
                            >
                            <Icon name="material-symbols:add" class="mr-2"></Icon>
                                Add New Project
                            </rs-button>
                        </div>
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
                                            <th class="px-4 py-2 text-left border border-gray-200">Document Type</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">Criteria</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="doc in docs" :key="doc.id" class="hover:bg-gray-50">
                                            <td class="px-4 py-2 border border-gray-200">{{ doc.projectName }}</td>
                                            <td class="px-4 py-2 border border-gray-200">{{ doc.documentType }}</td>
                                            <td class="px-4 py-2 border border-gray-200 whitespace-pre-wrap">{{ doc.criteria }}</td>
                                            <td class="px-4 py-2 border border-gray-200 space-x-2">
                                                <NuxtLink
                                                    :to="`/document-management/view?id=${doc.id}`"
                                                    class="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 inline-flex items-center justify-center"
                                                    title="Edit Document"
                                                >
                                                    <Icon name="material-symbols:edit" class="mr-2" title="Edit"></Icon>
                                                </NuxtLink>
                                                <rs-button
                                                    class="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 inline-flex items-center justify-center"
                                                    @click="alert(`Deleting document ${doc.id}...`)"
                                                    title="Delete Document"
                                                >
                                                    <Icon name="material-symbols:delete" class="mr-2" title="Delete"></Icon>
                                                </rs-button>
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
                            title="Download Version"
                        >
                            Download
                        </button>
                    </li>
                </ul>
            </template>
        </rs-modal>
    </div>
</template>
