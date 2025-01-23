<script setup>
import { reactive, ref, onMounted } from 'vue'; // Import reactive, ref, and onMounted from Vue

definePageMeta({
  title: "Add New Project",
  layout: "default",
  middleware: ["auth"], // Ensure only authenticated users can access
});

const form = reactive({
  projectName: "",
  projectId: "",
  projectDescription: "",
  projectStatus: "",
  notes: "",
  contractorDocuments: [],
  contractorValidationRules: "",
  contractorSubmissionDeadline: "",
  contractorApprovalWorkflow: [],
  ivvDocuments: [],
  ivvValidationStandards: "",
  ivvFrequencyOfSubmission: "",
  ivvApprovalWorkflow: [],
  projectManagementCriteria: [], // Remove dummy data
  newCriteria: { name: "", description: "" } // Initialize newCriteria
});

const showModalCenter = ref(false); // Initialize showModalCenter
const showEditModal = ref(false); // Initialize showEditModal
const editCriteria = reactive({ name: "", description: "" }); // Initialize editCriteria

const validatorOptions = [
  { value: "Validator 1", label: "Validator 1" },
  { value: "Validator 2", label: "Validator 2" },
  { value: "Validator 3", label: "Validator 3" },
];

const documentOptions = [
  { value: "Business License", label: "Business License" },
  { value: "Financial Statements", label: "Financial Statements" },
  { value: "Tax Clearance Certificate", label: "Tax Clearance Certificate" },
  { value: "Test Plans", label: "Test Plans" },
  { value: "Test Reports", label: "Test Reports" },
  { value: "Compliance Certificates", label: "Compliance Certificates" },
];

const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "Active", label: "Active" },
  { value: "Completed", label: "Completed" },
];

const criteriaOptions = [
  { value: "Criteria 1", label: "Criteria 1" },
  { value: "Criteria 2", label: "Criteria 2" },
  { value: "Criteria 3", label: "Criteria 3" },
];

const generateProjectId = () => {
  return `PRJ-${Math.floor(Math.random() * 10000)}`;
};

const today = new Date();
const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

onMounted(() => {
  form.projectId = generateProjectId();
});

const submitForm = () => {
  // Handle form submission logic here
  alert("Form submitted!");
};

const addCriteria = () => {
  if (form.newCriteria.name && form.newCriteria.description) {
    form.projectManagementCriteria.push({ 
      name: form.newCriteria.name.name || form.newCriteria.name, 
      description: form.newCriteria.description 
    });
    form.newCriteria = { name: "", description: "" };
    showModalCenter.value = false;
  } else {
    alert("Please fill in all fields.");
  }
};

const clickOK = () => {
  addCriteria();
};

const clickCancel = () => {
  showModalCenter.value = false;
};

const openEditModal = (criteria) => {
  editCriteria.name = criteria.name;
  editCriteria.description = criteria.description;
  showEditModal.value = true;
};

const saveEditCriteria = () => {
  const index = form.projectManagementCriteria.findIndex(c => c.name === editCriteria.name && c.description === editCriteria.description);
  if (index !== -1) {
    form.projectManagementCriteria[index] = { ...editCriteria };
    showEditModal.value = false;
  }
};

const showDeleteModal = ref(false); // Initialize showDeleteModal
const criteriaToDelete = ref(null); // Initialize criteriaToDelete

const openDeleteModal = (index) => {
  criteriaToDelete.value = index;
  showDeleteModal.value = true;
};

const deleteCriteria = () => {
  if (criteriaToDelete.value !== null) {
    form.projectManagementCriteria.splice(criteriaToDelete.value, 1);
    showDeleteModal.value = false;
    criteriaToDelete.value = null;
  }
};

const showIVVModalCenter = ref(false); // Initialize showIVVModalCenter
const showIVVEditModal = ref(false); // Initialize showIVVEditModal
const editIVVCriteria = reactive({ name: "", description: "" }); // Initialize editIVVCriteria

const addIVVCriteria = () => {
  if (form.newCriteria.name && form.newCriteria.description) {
    form.ivvApprovalWorkflow.push({ 
      name: form.newCriteria.name.name || form.newCriteria.name, 
      description: form.newCriteria.description 
    });
    form.newCriteria = { name: "", description: "" };
    showIVVModalCenter.value = false;
  } else {
    alert("Please fill in all fields.");
  }
};

const clickIVVOK = () => {
  addIVVCriteria();
};

const openIVVEditModal = (criteria) => {
  editIVVCriteria.name = criteria.name;
  editIVVCriteria.description = criteria.description;
  showIVVEditModal.value = true;
};

const saveIVVEditCriteria = () => {
  const index = form.ivvApprovalWorkflow.findIndex(c => c.name === editIVVCriteria.name && c.description === editIVVCriteria.description);
  if (index !== -1) {
    form.ivvApprovalWorkflow[index] = { ...editIVVCriteria };
    showIVVEditModal.value = false;
  }
};

const showIVVDeleteModal = ref(false); // Initialize showIVVDeleteModal
const ivvCriteriaToDelete = ref(null); // Initialize ivvCriteriaToDelete

const openIVVDeleteModal = (index) => {
  ivvCriteriaToDelete.value = index;
  showIVVDeleteModal.value = true;
};

const deleteIVVCriteria = () => {
  if (ivvCriteriaToDelete.value !== null) {
    form.ivvApprovalWorkflow.splice(ivvCriteriaToDelete.value, 1);
    showIVVDeleteModal.value = false;
    ivvCriteriaToDelete.value = null;
  }
};

</script>

<template>
    <div>
        <LayoutsBreadcrumb />
        <div>
            <form @submit.prevent="submitForm">
                <!-- Project Details Card -->
                <rs-card class="mb-6">
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold">Project Details</h3>
                            <div class="flex items-center space-x-4">
                                <span class="text-gray-500">ID: {{ form.projectId }}</span>
                            </div>
                        </div>
                    </template>
                    <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit
                            type="text"
                            name="projectName"
                            label="Project Name"
                            v-model="form.projectName"
                            validation="required"
                            input-class="w-full  border rounded-md"
                        />
                        <FormKit
                            type="select"
                            name="projectStatus"
                            label="Project Status"
                            :options="statusOptions"
                            v-model="form.projectStatus"
                            validation="required"
                            input-class="w-full  border rounded-md"
                        />
                    </div>
                </rs-card>

                <!-- Contractor Documentation Criteria Card -->
                <rs-card class="mb-6">
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold">Contractor Documentation Criteria</h3>
                            <rs-button class="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600" @click="showModalCenter = true">
                                <Icon name="material-symbols:add" class="mr-2"></Icon>
                                Add Criteria</rs-button>
                        </div>
                    </template>
                    <div class="p-4">
                        <table class="table-auto w-full border-collapse border border-gray-200 mb-4">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="px-2 py-2 text-left border border-gray-200 w-1/20">No</th>
                                    <th class="px-2 py-2 text-left border border-gray-200 w-1/4">Reference File</th>
                                    <th class="px-2 py-2 text-left border border-gray-200 w-2/4">Criteria Description</th>
                                    <th class="px-2 py-2 text-left border border-gray-200 w-1/6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="form.projectManagementCriteria.length === 0">
                                    <td class="px-4 py-2 border border-gray-200 text-center" colspan="4">No data available</td>
                                </tr>
                                <tr v-else v-for="(criteria, index) in form.projectManagementCriteria" :key="index" class="hover:bg-gray-50">
                                    <td class="px-2 py-2 border border-gray-200">{{ index + 1 }}</td>
                                    <td class="px-2 py-2 border border-gray-200">
                                        <div v-if="Array.isArray(criteria.name)">
                                            <div v-for="file in criteria.name" :key="file.name">
                                                {{ file.name }}
                                            </div>
                                        </div>
                                        <div v-else>
                                            {{ typeof criteria.name === 'string' ? criteria.name.split('\\').pop() : criteria.name }}
                                        </div>
                                    </td>
                                    <td class="px-2 py-2 border border-gray-200">{{ criteria.description }}</td>
                                    <td class="px-2 py-2 border border-gray-200 space-x-2 flex justify-center">
                                        <rs-button class="px-2 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600" @click="openEditModal(criteria)">Edit</rs-button>
                                        <rs-button class="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600" @click="openDeleteModal(index)">Delete</rs-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </rs-card>

                <!-- IVV Documentation Criteria Card -->
                <rs-card class="mb-6">
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold">IVV Documentation Criteria</h3>
                            <rs-button class="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600" @click="showIVVModalCenter = true">
                                <Icon name="material-symbols:add" class="mr-2"></Icon>
                                Add Criteria</rs-button>
                        </div>
                    </template>
                    <div class="p-4">
                        <table class="table-auto w-full border-collapse border border-gray-200 mb-4">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="px-2 py-2 text-left border border-gray-200 w-1/20">No</th>
                                    <th class="px-2 py-2 text-left border border-gray-200 w-1/4">Reference File</th>
                                    <th class="px-2 py-2 text-left border border-gray-200 w-2/4">Criteria Description</th>
                                    <th class="px-2 py-2 text-left border border-gray-200 w-1/6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="form.ivvApprovalWorkflow.length === 0">
                                    <td class="px-4 py-2 border border-gray-200 text-center" colspan="4">No data available</td>
                                </tr>
                                <tr v-else v-for="(criteria, index) in form.ivvApprovalWorkflow" :key="index" class="hover:bg-gray-50">
                                    <td class="px-2 py-2 border border-gray-200">{{ index + 1 }}</td>
                                    <td class="px-2 py-2 border border-gray-200">
                                        <div v-if="Array.isArray(criteria.name)">
                                            <div v-for="file in criteria.name" :key="file.name">
                                                {{ file.name }}
                                            </div>
                                        </div>
                                        <div v-else>
                                            {{ typeof criteria.name === 'string' ? criteria.name.split('\\').pop() : criteria.name }}
                                        </div>
                                    </td>
                                    <td class="px-2 py-2 border border-gray-200">{{ criteria.description }}</td>
                                    <td class="px-2 py-2 border border-gray-200 space-x-2 flex justify-center">
                                        <rs-button class="px-2 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600" @click="openIVVEditModal(criteria)">Edit</rs-button>
                                        <rs-button class="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600" @click="openIVVDeleteModal(index)">Delete</rs-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </rs-card>

                <!-- Submit Button -->
                <div class="flex justify-end">
                    <rs-button
                        type="submit"
                        class="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                        Submit
                    </rs-button>
                </div>
            </form>
        </div>
        <rs-modal title="Add New Criteria" position="center" v-model="showModalCenter" :ok-callback="clickOK" ok-title="Submit">
            <FormKit
                type="file"
                name="criteriaFile"
                label="Reference File"
                v-model="form.newCriteria.name"
            />
            <FormKit
                type="textarea"
                name="criteriaDescription"
                label="Criteria Description"
                v-model="form.newCriteria.description"
            />
        </rs-modal>
        <rs-modal title="Edit Criteria" position="center" v-model="showEditModal" :ok-callback="saveEditCriteria" ok-title="Save">
            <FormKit
                type="file"
                name="criteriaFile"
                label="Reference File"
                v-model="editCriteria.name"
            />
            <FormKit
                type="textarea"
                name="criteriaDescription"
                label="Criteria Description"
                v-model="editCriteria.description"
            />
        </rs-modal>
        <rs-modal title="Delete Criteria" position="center" v-model="showDeleteModal" :ok-callback="deleteCriteria" ok-title="Delete">
            <p>Delete this criteria?</p>
        </rs-modal>
        <rs-modal title="Add New IVV Criteria" position="center" v-model="showIVVModalCenter" :ok-callback="clickIVVOK" ok-title="Submit">
            <FormKit
                type="file"
                name="criteriaFile"
                label="Reference File"
                v-model="form.newCriteria.name"
            />
            <FormKit
                type="textarea"
                name="criteriaDescription"
                label="Criteria Description"
                v-model="form.newCriteria.description"
            />
        </rs-modal>
        <rs-modal title="Edit IVV Criteria" position="center" v-model="showIVVEditModal" :ok-callback="saveIVVEditCriteria" ok-title="Save">
            <FormKit
                type="file"
                name="criteriaFile"
                label="Reference File"
                v-model="editIVVCriteria.name"
            />
            <FormKit
                type="textarea"
                name="criteriaDescription"
                label="Criteria Description"
                v-model="editIVVCriteria.description"
            />
        </rs-modal>
        <rs-modal title="Delete IVV Criteria" position="center" v-model="showIVVDeleteModal" :ok-callback="deleteIVVCriteria" ok-title="Delete">
            <p>Delete this criteria?</p>
        </rs-modal>
    </div>
</template>
