import mongoose, { Schema, Document, Types } from "mongoose";

export interface InvitationDocument extends Document {
    _id: Types.ObjectId,
    guestUUID?: string,
    guest: string,
    urlBanner: string,
    code: string,
    title: string,
    date: string,
    address: string,
    time: string,
    gate: string,
    table: string,
    ulrBarcode: string,
    participants: string,
    restaurant: string,
    isActive: boolean
}

const InvitationSchema: Schema = new Schema({
    code: { type: String },
    guestUUID: { type: String },
    guest: { type: String },
    urlBanner: { type: String },
    title: { type: String },
    date: { type: String },
    address: { type: String },
    time: { type: String },
    gate: { type: String },
    table: { type: String },
    ulrBarcode: { type: String },
    participants: { type: String },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    isActive: { type: Boolean, default: true }
})

export const InvitationModel = mongoose.models.Invitation || mongoose.model<InvitationDocument>('Invitation', InvitationSchema, 'Invitation')