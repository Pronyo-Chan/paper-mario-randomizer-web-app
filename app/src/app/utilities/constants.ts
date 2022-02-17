import { MenuColor } from "../entities/menuColors";

export class Constants {

    public static VALID_ROM_CRC: string = "2817903998"; //decimal value
    public static MENU_COLORS: MenuColor[] = [
        {colorA: 0xEBE677FF, colorB: 0x8E5A25FF}, // 0 = Default
        {colorA: 0xFD744AFF, colorB: 0xAB4B2EFF}, // 1 = Red
    ]

}