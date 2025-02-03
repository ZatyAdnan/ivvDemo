<script setup>
definePageMeta({
  title: "Contractor Configuration",
  layout: "default",
  middleware: ["auth"], // Ensure only authenticated users can access
});

// Dummy Data for Contractors
const contractors = ref([
  {
    id: 1,
    name: "John Doe",
    phoneNo: "123-456-7890",
    email: "john.doe@example.com",
    assignedProjects: ["Project Alpha", "Project Beta"],
  },
  {
    id: 2,
    name: "Jane Smith",
    phoneNo: "234-567-8901",
    email: "jane.smith@example.com",
    assignedProjects: ["Project Gamma"],
  },
  {
    id: 3,
    name: "Michael Johnson",
    phoneNo: "345-678-9012",
    email: "michael.johnson@example.com",
    assignedProjects: ["Project Alpha", "Project Gamma"],
  },
]);

const projectOptions = [
  { value: "Project Alpha", label: "Project Alpha" },
  { value: "Project Beta", label: "Project Beta" },
  { value: "Project Gamma", label: "Project Gamma" },
];

const selectedContractor = ref(null); // Contractor selected for details
const showDetailsModal = ref(false); // Toggles the details modal

const filterProjectOptions = [
  ...projectOptions,
];

const filter = reactive({
  projectName: "Project Alpha",
});

const filteredContractors = computed(() => {
  return contractors.value.filter(contractor => {
    return filter.projectName ? contractor.assignedProjects.includes(filter.projectName) : true;
  });
});

const sortedContractorsByProject = computed(() => {
  const grouped = contractors.value.reduce((acc, contractor) => {
    contractor.assignedProjects.forEach(project => {
      if (!acc[project]) {
        acc[project] = [];
      }
      acc[project].push(contractor);
    });
    return acc;
  }, {});

  if (filter.projectName) {
    return { [filter.projectName]: grouped[filter.projectName] || [] };
  }

  return grouped;
});

const collapsedProjects = reactive({});

const toggleProjectCollapse = (projectName) => {
  collapsedProjects[projectName] = !collapsedProjects[projectName];
};

// Open details modal
const openDetailsModal = (contractor) => {
  selectedContractor.value = contractor;
  showDetailsModal.value = true;
};

// Close details modal
const closeDetailsModal = () => {
  selectedContractor.value = null;
  showDetailsModal.value = false;
};

const router = useRouter(); // Import useRouter from Vue Router

const showModalCenter = ref(false); // Toggles the view modal
const viewContractor = ref(null); // Contractor selected for viewing

// Open view modal
const openViewModal = (contractor) => {
  viewContractor.value = contractor;
  showModalCenter.value = true;
};

// Close view modal
const closeViewModal = () => {
  viewContractor.value = null;
  showModalCenter.value = false;
};

// Open edit modal
const openEditModal = (contractor) => {
  viewContractor.value = contractor;
  showModalCenter.value = true;
};

const showDeleteModal = ref(false); // Toggles the delete confirmation modal
const contractorToDelete = ref({}); // Contractor selected for deletion

// Open delete modal
const openDeleteModal = (contractor) => {
  contractorToDelete.value = contractor;
  showDeleteModal.value = true;
};

// Close delete modal
const closeDeleteModal = () => {
  contractorToDelete.value = {};
  showDeleteModal.value = false;
};

// Confirm delete contractor
const confirmDeleteContractor = () => {
  contractors.value = contractors.value.filter(contractor => contractor.id !== contractorToDelete.value.id);
  closeDeleteModal();
};

const saveContractorChanges = () => {
  const index = contractors.value.findIndex(contractor => contractor.id === viewContractor.value.id);
  if (index !== -1) {
    contractors.value[index] = { ...viewContractor.value };
  }
  closeEditModal();
};

const closeEditModal = () => {
  viewContractor.value = null;
  showModalCenter.value = false;
};

const showAddModal = ref(false); // Toggles the add contractor modal
const newContractor = ref({
  name: "",
  phoneNo: "",
  email: "",
  assignedProjects: [],
});

// Open add modal
const openAddModal = () => {
  newContractor.value = {
    name: "",
    phoneNo: "",
    email: "",
    assignedProjects: [],
  };
  showAddModal.value = true;
};

// Close add modal
const closeAddModal = () => {
  newContractor.value = {
    name: "",
    phoneNo: "",
    email: "",
    assignedProjects: [],
  };
  showAddModal.value = false;
};

// Save new contractor
const saveNewContractor = () => {
  newContractor.value.id = contractors.value.length + 1;
  contractors.value.push({ ...newContractor.value });
  closeAddModal();
};
</script>

<template>
    <div>
        <LayoutsBreadcrumb />
        <div class="h-full">
            <!-- Contractor List -->
            <rs-card class="h-full">
                <template #header>
                </template>
                <template #body>
                    <div class="flex justify-between mb-4 border-b-4">
                        <h3 class="text-lg font-semibold">List of Contractors by Project</h3>
                        <rs-button
                            class="px-4 py-1 mb-2"
                            @click="openAddModal" 
                        >
                            <Icon name="material-symbols:add" class="mr-2"></Icon>
                            Add New Contractor
                        </rs-button>
                    </div>
                    <!-- Filters -->
                    <div class="mb-4">
                        <FormKit
                            type="select"
                            name="filterProjectName"
                            label="Filter by Project Name"
                            :options="filterProjectOptions"
                            v-model="filter.projectName"
                        />
                    </div>
                    <rs-card class="p-4 h-full" style="max-height: 55vh; overflow-y: auto;">
                        <div v-for="(contractors, projectName) in sortedContractorsByProject" :key="projectName" v-show="!filter.projectName || filter.projectName === projectName">
                            <div class="flex justify-between items-center my-4 border-b-4 cursor-pointer" @click="toggleProjectCollapse(projectName)">
                                <h4 class="text-lg font-semibold">{{ projectName }}</h4>
                                <div class="flex items-center">
                                    <span class="text-sm text-gray-500 ml-2">
                                        {{ contractors.length === 0 ? 'No Contractors' : contractors.length === 1 ? '1 Contractor' : `${contractors.length} Contractors` }}
                                    </span>
                                    <Icon :name="collapsedProjects[projectName] ? 'material-symbols:expand-more' : 'material-symbols:expand-less'" />
                                </div>
                            </div>
                            <div v-show="!collapsedProjects[projectName]" style="max-height: 40vh; overflow-y: auto;">
                                <table class="table-auto w-full border-collapse border border-gray-200 mb-4">
                                    <thead>
                                        <tr class="bg-gray-100">
                                            <th class="px-4 py-2 text-left border border-gray-200">Name</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">Phone No</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">Email</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">Assigned Projects</th>
                                            <th class="px-4 py-2 text-left border border-gray-200">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="contractor in contractors" :key="contractor.id" class="hover:bg-gray-50">
                                            <td class="px-4 py-2 border border-gray-200">{{ contractor.name }}</td>
                                            <td class="px-4 py-2 border border-gray-200">{{ contractor.phoneNo }}</td>
                                            <td class="px-4 py-2 border border-gray-200">{{ contractor.email }}</td>
                                            <td class="px-4 py-2 border border-gray-200">{{ contractor.assignedProjects.join(', ') }}</td>
                                            <td class="px-4 py-2 border border-gray-200 space-x-2">
                                                <rs-button
                                                    class="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 inline-flex items-center justify-center"
                                                    @click="openEditModal(contractor)"
                                                    title="Edit Contractor"
                                                >
                                                    <Icon name="material-symbols:edit" class="mr-2" title="Edit"></Icon>
                                                </rs-button>
                                                <rs-button
                                                    class="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 inline-flex items-center justify-center"
                                                    @click="openDeleteModal(contractor)"
                                                    title="Delete Contractor"
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
        <!-- Contractor Details Modal -->
        <rs-modal v-model="showDetailsModal" @close="closeDetailsModal">
            <template #header>
                <h3 class="text-lg font-semibold">Contractor Details</h3>
            </template>
            <template #body>
                <div v-if="selectedContractor">
                    <p><strong>Name:</strong> {{ selectedContractor.name }}</p>
                    <p><strong>Phone No:</strong> {{ selectedContractor.phoneNo }}</p>
                    <p><strong>Email:</strong> {{ selectedContractor.email }}</p>
                    <p><strong>Assigned Projects:</strong> {{ selectedContractor.assignedProjects.join(', ') }}</p>
                </div>
            </template>
        </rs-modal>
        <rs-modal title="Edit Contractor" position="center" v-model="showModalCenter" ok-title="Save" :ok-callback="saveContractorChanges">
            <div v-if="viewContractor" class="space-y-4">
                <FormKit
                    type="text"
                    name="editContractorName"
                    label="Name"
                    v-model="viewContractor.name"
                />
                <FormKit
                    type="text"
                    name="editContractorPhoneNo"
                    label="Phone No"
                    v-model="viewContractor.phoneNo"
                />
                <FormKit
                    type="email"
                    name="editContractorEmail"
                    label="Email"
                    v-model="viewContractor.email"
                />
                <FormKit
                    type="checkbox"
                    name="editContractorAssignedProjects"
                    label="Assigned Projects"
                    :options="projectOptions"
                    v-model="viewContractor.assignedProjects"
                    class="max-h-40 overflow-y-auto"
                />
            </div>
        </rs-modal>
        <rs-modal title="Remove Contractor" position="center" v-model="showDeleteModal" ok-title="Remove" :ok-callback="confirmDeleteContractor">
            <div >
                <p>Are you sure you want to remove this contractor?</p>
            </div>
        </rs-modal>
        <rs-modal title="Add Contractor" position="center" v-model="showAddModal" ok-title="Save" :ok-callback="saveNewContractor">
            <div class="space-y-4">
                <FormKit
                    type="text"
                    name="newContractorName"
                    label="Name"
                    v-model="newContractor.name"
                />
                <FormKit
                    type="text"
                    name="newContractorPhoneNo"
                    label="Phone No"
                    v-model="newContractor.phoneNo"
                />
                <FormKit
                    type="email"
                    name="newContractorEmail"
                    label="Email"
                    v-model="newContractor.email"
                />
                <FormKit
                    type="checkbox"
                    name="newContractorAssignedProjects"
                    label="Assigned Projects"
                    :options="projectOptions"
                    v-model="newContractor.assignedProjects"
                    class="max-h-40 overflow-y-auto"
                />
            </div>
        </rs-modal>
    </div>
</template>
