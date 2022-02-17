import { MenuColor } from "../entities/menuColors";

export class Constants {

    public static VALID_ROM_CRC: string = "2817903998"; //decimal value
    public static MENU_COLORS: MenuColor[] = [
        {colorA: 0xEBE677FF, colorB: 0x8E5A25FF}, // 0 = Default
        {colorA: 0xFD744AFF, colorB: 0xB45031FF}, // 1 = Red
        {colorA: 0x2748E1FF, colorB: 0x172F9FFF}, // 2 = Blue
        {colorA: 0x22EEC9FF, colorB: 0x14A98EFF}, // 3 = Cyan
        {colorA: 0x68FF51FF, colorB: 0x47B836FF}, // 4 = Green
        {colorA: 0xAD72C2FF, colorB: 0x794E89FF}, // 5 = Purple
    ]

}