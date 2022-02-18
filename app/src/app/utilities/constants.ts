import { MenuColor } from "../entities/menuColors";

export class Constants {

    public static VALID_ROM_CRC: string = "2817903998"; //decimal value
    public static MENU_COLORS: MenuColor[] = [
        {colorA: 0xEBE677FF, colorB: 0x8E5A25FF}, // 0 = Default
        {colorA: 0x8D8FFFFF, colorB: 0x2B4566FF}, // 1 = Blue
        {colorA: 0xAAD080FF, colorB: 0x477B53FF}, // 2 = Green
        {colorA: 0x8ED4ECFF, colorB: 0x436245FF}, // 3 = Teal
        {colorA: 0xD7BF74FF, colorB: 0x844632FF}, // 4 = Brown
        {colorA: 0xB797B7FF, colorB: 0x62379AFF}, // 5 = Purple
        {colorA: 0xC0C0C0FF, colorB: 0x404040FF}, // 6 = Grey
    ]

}