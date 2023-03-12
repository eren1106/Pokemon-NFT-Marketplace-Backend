import mongoose, { Document, Schema } from 'mongoose';

export interface IPokemon {
    name: string,
    no: number,
    index: number,
    types: Array<string>,
    level: number,
    atk: number,
    def: number,
    spAtk: number,
    spDef: number,
    hp: number,
    speed : number,
    imgUrl: string,
    price: number,
    prevPrice?: number,
    ownerID?: string,
    forSale: boolean,
}

export interface IPokemonModel extends IPokemon, Document {}

const PokemonSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        no: { type: Number, required: true },
        index: { type: Number, required: true },
        types: { type: Array<String>, required: true},
        level: { type: Number, required: true },
        atk: { type: Number, required: true },
        def: { type: Number, required: true },
        spAtk: { type: Number, required: true },
        spDef: { type: Number, required: true },
        hp: { type: Number, required: true },
        speed: { type: Number, required: true },
        imgUrl: { type: String, required: true },
        price: { type: Number, required: true },
        prevPrice: { type: Number },
        ownerID: { type: Schema.Types.ObjectId, ref: 'User' },
        forSale: { type: Boolean, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IPokemonModel>('Pokemon', PokemonSchema);