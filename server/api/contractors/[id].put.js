export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
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

    // Check if contractor exists
    const existingContractor = await prisma.kontraktor.findUnique({
      where: {
        kontraktor_id: id
      }
    });

    if (!existingContractor) {
      return {
        statusCode: 404,
        message: "Contractor not found"
      };
    }

    // Check if registration number is unique (excluding current contractor)
    const duplicateCheck = await prisma.kontraktor.findFirst({
      where: {
        kontraktor_no_pendaftaran: body.registrationNo,
        kontraktor_id: {
          not: id
        }
      }
    });

    if (duplicateCheck) {
      return {
        statusCode: 400,
        message: "Registration number already exists"
      };
    }

    // Update contractor
    const updatedContractor = await prisma.kontraktor.update({
      where: {
        kontraktor_id: id
      },
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
        kontraktor_wakil_emel: body.repEmail
      },
      include: {
        lookup_kontraktor_kontraktor_kategoriTolookup: true,
        lookup_kontraktor_kontraktor_gred_cidbTolookup: true,
        lookup_kontraktor_kontraktor_negeriTolookup: true
      }
    });

    return {
      statusCode: 200,
      message: "Contractor updated successfully",
      data: {
        id: updatedContractor.kontraktor_id,
        name: updatedContractor.kontraktor_nama,
        registrationNo: updatedContractor.kontraktor_no_pendaftaran,
        category: updatedContractor.kontraktor_kategori,
        grade: updatedContractor.kontraktor_gred_cidb,
        expertise: updatedContractor.kontraktor_bidang_kepakaran,
        address1: updatedContractor.kontraktor_alamat_1,
        address2: updatedContractor.kontraktor_alamat_2,
        city: updatedContractor.kontraktor_bandar,
        state: updatedContractor.kontraktor_negeri,
        postcode: updatedContractor.kontraktor_poskod,
        repName: updatedContractor.kontraktor_wakil_nama,
        repPosition: updatedContractor.kontraktor_wakil_jawatan,
        repIC: updatedContractor.kontraktor_wakil_ic,
        repPhone: updatedContractor.kontraktor_wakil_no_telefon,
        repEmail: updatedContractor.kontraktor_wakil_emel,
        // Include lookup values
        categoryName: updatedContractor.lookup_kontraktor_kontraktor_kategoriTolookup?.lookupValue,
        gradeName: updatedContractor.lookup_kontraktor_kontraktor_gred_cidbTolookup?.lookupValue,
        stateName: updatedContractor.lookup_kontraktor_kontraktor_negeriTolookup?.lookupValue
      }
    };
  } catch (error) {
    console.error("Error updating contractor:", error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 