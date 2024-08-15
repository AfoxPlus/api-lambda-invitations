import { Invitation } from "@core/domain/entities/Invitation"
import { InvitationDocument, InvitationModel } from "@core/data/sources/mongoDB/models/invitation.model"

export class InvitationMongoDBSource {
    fetch = async (guestUUID: string): Promise<Invitation[]> => {
        const result: InvitationDocument[] = await InvitationModel.find({ isActive: true }).where('guestUUID').equals(guestUUID)
        return result.map((document) => this.invitationDocumentoToDomain(document))
    }
    findByCode = async (code: string): Promise<Invitation> => {
        const result: InvitationDocument = await InvitationModel.findOne({ code: code.toUpperCase(), isActive: true }).where('guestUUID').equals("")
        if (result != null)
            return this.invitationDocumentoToDomain(result)
        else
            throw new Error("Event doesn't exist")
    }

    setGuestUUID = async (guestUUID: string, invitationID: string): Promise<Boolean> => {
        const result = InvitationModel
            .updateOne({ _id: invitationID }, { guestUUID: guestUUID })
            .then((item) => { return item.modifiedCount == 1 })
            .catch((_) => { return false })
        return result
    }

    private invitationDocumentoToDomain(document: InvitationDocument): Invitation {
        return {
            id: document._id.toString(),
            restaurant_id: document.restaurant.toString(),
            urlBanner: document.urlBanner,
            code: document.code,
            title: document.title,
            date: document.date,
            address: document.address,
            guest: document.guest,
            time: document.time,
            gate: document.gate,
            table: document.table,
            ulrBarcode: document.ulrBarcode,
            participants: document.participants
        }
    }

}