import { Invitation } from "@core/domain/entities/Invitation"
import { InvitationDocument, InvitationModel } from "@core/data/sources/mongoDB/models/invitation.model"

export class InvitationMongoDBSource {
    fetch = async (guestUUID: string): Promise<Invitation[]> => {
        const result: InvitationDocument[] = await InvitationModel.find({ isActive: true }).where('guestUUID').equals(guestUUID)
        return result.map((document) => this.invitationDocumentoToDomain(document))
    }
    findByCode = async (code: string): Promise<Invitation> => {
        const result: InvitationDocument = await InvitationModel.findOne({ code: code, isActive: true }).where('guestUUID').equals("")
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
        console.log("RESULT UPDATE" + result)
        return result
    }

    private invitationDocumentoToDomain(document: InvitationDocument): Invitation {
        return {
            id: document._id.toString(),
            urlBanner: document.urlBanner.toString(),
            code: document.code.toString(),
            title: document.title.toString(),
            date: document.date.toString(),
            address: document.address.toString(),
            guest: document.guest.toString(),
            time: document.time.toString(),
            gate: document.gate.toString(),
            table: document.table.toString(),
            ulrBarcode: document.ulrBarcode.toString(),
            participants: document.participants.toString()
        }
    }

}