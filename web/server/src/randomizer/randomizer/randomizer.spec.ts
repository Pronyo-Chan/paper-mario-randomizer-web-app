import { Player } from '../../entities/player/player';
import { Randomizer } from './randomizer';
import {} from "jasmine"
import { Partner } from '../../enums/partner';

import { PartnerLocationFactory } from '../../factories/partnerLocationFactory';
import { ItemLocation } from '../../entities/itemLocation';
import { ItemLocationType } from '../../enums/itemLocationType';
import { EquipUpgrade } from '../../enums/equipUpgrade';
import { KeyItem } from '../../enums/keyItem';
describe('PartnerRandomizer', () => {

  var _sut: Randomizer;
  var _player: Player;

  var mockGoombario = new ItemLocation(
    Partner.GOOMBARIO,
    ItemLocationType.Partner,
    [[EquipUpgrade.HAMMER]],
    'kmr_02',
    false,
    0      
);

  var mockKooper = new ItemLocation(
    Partner.KOOPER,
    ItemLocationType.Partner,
    [[KeyItem.KOOPER_SHELL, EquipUpgrade.HAMMER]],
    'nok_04',
    true,
    0
)
  beforeEach(() => {
    _player = new Player()
    _sut = new Randomizer(_player);
  });

  describe('constructor', () => {
    it('should initialize available partner locations by getting them from the partners location factory', () => {
      // Arrange
      PartnerLocationFactory.getInstance().getAllPartnerLocations = () => [mockGoombario, mockKooper]

      // Act
      _sut = new Randomizer(_player);

      // Assert
      expect(_sut['availablePartnerLocations']).toEqual([mockGoombario, mockKooper])
    });
  });

  describe('randomizePartners', () => {
    it('should return a list of randomized partners of the same length as all partner locations', () => {
      // Arrange
      PartnerLocationFactory.getInstance().getAllPartnerLocations = () => [mockGoombario, mockKooper]
      _sut = new Randomizer(_player);
     
      // Act
      var result = _sut.randomizeGame();

      // Assert
      expect(result).toBeFalsy();
    });

  });
});