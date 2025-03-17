export default defineEventHandler(async (event) => {
  try {
    // Get contractors with lookup relations
    const contractors = await prisma.kontraktor.findMany({
      include: {
        lookup_kontraktor_kontraktor_kategoriTolookup: true,
        lookup_kontraktor_kontraktor_gred_cidbTolookup: true,
        lookup_kontraktor_kontraktor_negeriTolookup: true,
      },
    });

    // Transform data to match frontend expectations
    const transformedData = contractors.map((contractor) => ({
      id: contractor.kontraktor_id,
      name: contractor.kontraktor_nama,
      registrationNo: contractor.kontraktor_no_pendaftaran,
      category: contractor.kontraktor_kategori,
      grade: contractor.kontraktor_gred_cidb,
      expertise: contractor.kontraktor_bidang_kepakaran,
      address1: contractor.kontraktor_alamat_1,
      address2: contractor.kontraktor_alamat_2,
      city: contractor.kontraktor_bandar,
      state: contractor.kontraktor_negeri,
      postcode: contractor.kontraktor_poskod,
      repName: contractor.kontraktor_wakil_nama,
      repPosition: contractor.kontraktor_wakil_jawatan,
      repIC: contractor.kontraktor_wakil_ic,
      repPhone: contractor.kontraktor_wakil_no_telefon,
      repEmail: contractor.kontraktor_wakil_emel,
      // Include lookup values
      categoryName: contractor.lookup_kontraktor_kontraktor_kategoriTolookup?.lookupValue,
      gradeName: contractor.lookup_kontraktor_kontraktor_gred_cidbTolookup?.lookupValue,
      stateName: contractor.lookup_kontraktor_kontraktor_negeriTolookup?.lookupValue,
    }));

    // Get total count
    const totalCount = await prisma.kontraktor.count();

    // Get active count (you may need to adjust this based on your active criteria)
    const activeCount = totalCount; // For now, assuming all are active

    return {
      statusCode: 200,
      message: "Contractors retrieved successfully",
      data: transformedData,
      summary: {
        total: totalCount,
        active: activeCount,
      },
    };
  } catch (error) {
    console.error("Error retrieving contractors:", error);
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
}); 