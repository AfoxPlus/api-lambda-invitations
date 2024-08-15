import { Invitation } from "@core/domain/entities/Invitation";

export interface InvitationRepository {
    fetch(guestUUID: string): Promise<Invitation[]>
    findByCode(code: string): Promise<Invitation>
    setGuestUUID(guestUUID: string, invitationID: string): Promise<Boolean>
}