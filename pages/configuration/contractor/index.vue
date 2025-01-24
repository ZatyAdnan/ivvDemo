<template>
    <div>
        <LayoutsBreadcrumb />

        <div>
    
            <rs-card class="p-4 mt-4">
                <table class="table-auto w-full border-collapse border border-gray-200 mb-4">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-left border border-gray-200">Contractor Name</th>
                            <th class="px-4 py-2 text-left border border-gray-200">Email</th>
                            <th class="px-4 py-2 text-left border border-gray-200">Phone</th>
                            <th class="px-4 py-2 text-left border border-gray-200">Address</th>
                            <th class="px-4 py-2 text-left border border-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="contractor in contractors" :key="contractor.id" class="hover:bg-gray-50">
                            <td class="px-4 py-2 border border-gray-200">{{ contractor.name }}</td>
                            <td class="px-4 py-2 border border-gray-200">{{ contractor.email }}</td>
                            <td class="px-4 py-2 border border-gray-200">{{ contractor.phone }}</td>
                            <td class="px-4 py-2 border border-gray-200">{{ contractor.address }}</td>
                            <td class="px-4 py-2 border border-gray-200 space-x-2">
                                <rs-button
                                    class="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 inline-flex items-center justify-center"
                                    @click="editContractor(contractor)"
                                    title="Edit Contractor"
                                >
                                    <Icon name="material-symbols:edit" class="mr-2" title="Edit"></Icon>
                                </rs-button>
                                <rs-button
                                    class="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 inline-flex items-center justify-center"
                                    @click="deleteContractor(contractor)"
                                    title="Delete Contractor"
                                >
                                    <Icon name="material-symbols:delete" class="mr-2" title="Delete"></Icon>
                                </rs-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </rs-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            contractorName: '',
            contractorEmail: '',
            contractorPhone: '',
            contractorAddress: '',
            contractors: [
                { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', address: '456 Elm St' }
            ]
        };
    },
    methods: {
        submitForm() {
            // Handle form submission
            console.log('Form submitted:', this.contractorName, this.contractorEmail, this.contractorPhone, this.contractorAddress);
        },
        editContractor(contractor) {
            // Handle edit contractor
            console.log('Edit contractor:', contractor);
        },
        deleteContractor(contractor) {
            // Handle delete contractor
            console.log('Delete contractor:', contractor);
        }
    }
};

definePageMeta({
  title: "Contractor Configuration",
  layout: "default",
  middleware: ["auth"], // Ensure only authenticated users can access
});
</script>
