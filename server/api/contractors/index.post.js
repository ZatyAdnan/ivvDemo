export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate required fields
    if (!body.name || !body.registrationNo || !body.category || !body.grade || 
        !body.address1 || !body.city || !body.state || !body.postcode || 
        !body.repName || !body.repPosition || !body.repIC || !body.repPhone || !body.repEmail) {
      return {
        statusCode: 400,
        message: "Missing required fields"
      };
    }

    // Check if registration number already exists
    const existingContractor = await prisma.kontraktor.findUnique({
      where: {
        kontraktor_no_pendaftaran: body.registrationNo
      }
    });

    if (existingContractor) {
      return {
        statusCode: 400,
        message: "Registration number already exists"
      };
    }

    // Create new contractor
    const newContractor = await prisma.kontraktor.create({
      data: {
        kontraktor_nama: body.name,
        kontraktor_no_pendaftaran: body.registrationNo,
        kontraktor_kategori: parseInt(body.category),
        kontraktor_gred_cidb: parseInt(body.grade),
        kontraktor_bidang_kepakaran: body.expertise || "",
        kontraktor_alamat_1: body.address1,
        kontraktor_alamat_2: body.address2 || "",
        kontraktor_bandar: body.city,
        kontraktor_negeri: parseInt(body.state),
        kontraktor_poskod: body.postcode,
        kontraktor_wakil_nama: body.repName,
        kontraktor_wakil_jawatan: body.repPosition,
        kontraktor_wakil_ic: body.repIC,
        kontraktor_wakil_no_telefon: body.repPhone,
        kontraktor_wakil_emel: body.repEmail,
        kontraktor_tarikh_daftar: new Date()
      },
      include: {
        lookup_kontraktor_kontraktor_kategoriTolookup: true,
        lookup_kontraktor_kontraktor_gred_cidbTolookup: true,
        lookup_kontraktor_kontraktor_negeriTolookup: true
      }
    });

    return {
      statusCode: 201,
      message: "Contractor created successfully",
      data: {
        id: newContractor.kontraktor_id,
        name: newContractor.kontraktor_nama,
        registrationNo: newContractor.kontraktor_no_pendaftaran,
        category: newContractor.kontraktor_kategori,
        grade: newContractor.kontraktor_gred_cidb,
        expertise: newContractor.kontraktor_bidang_kepakaran,
        address1: newContractor.kontraktor_alamat_1,
        address2: newContractor.kontraktor_alamat_2,
        city: newContractor.kontraktor_bandar,
        state: newContractor.kontraktor_negeri,
        postcode: newContractor.kontraktor_poskod,
        repName: newContractor.kontraktor_wakil_nama,
        repPosition: newContractor.kontraktor_wakil_jawatan,
        repIC: newContractor.kontraktor_wakil_ic,
        repPhone: newContractor.kontraktor_wakil_no_telefon,
        repEmail: newContractor.kontraktor_wakil_emel,
        // Include lookup values
        categoryName: newContractor.lookup_kontraktor_kontraktor_kategoriTolookup?.lookupValue,
        gradeName: newContractor.lookup_kontraktor_kontraktor_gred_cidbTolookup?.lookupValue,
        stateName: newContractor.lookup_kontraktor_kontraktor_negeriTolookup?.lookupValue
      }
    };
  } catch (error) {
    console.error("Error creating contractor:", error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 