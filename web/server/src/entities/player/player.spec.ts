import { EquipUpgradeLocationFactory } from './../../factories/equipUpgradeFactory';
import { ItemLocation } from './../itemLocation';
import { Player } from './player';
import {} from "jasmine"
import { Partner } from '../../enums/partner';
import { KeyItem } from '../../enums/keyItem';
import { EquipUpgrade } from '../../enums/equipUpgrade';
import { ItemLocationType } from '../../enums/itemLocationType';
import { KeyItemLocationFactory } from '../../factories/keyItemLocationFactory';
describe('Player', () => {
  var _sut: Player;
  beforeEach(() => {
    _sut = new Player();
  });

  describe('hasObject', () => {
    it('should return false if object name is not in keyItems, partners and equip upgrades', () => {
      // Arrange
      _sut.keyItems = [];
      _sut.partners = [];
      _sut.equipUpgrades = [];
     
      // Act
      var result = _sut.hasObject('mockObject');

      // Assert
      expect(result).toBeFalsy();
    });

    it('should return true if object name is in equip upgrades', () => {
      // Arrange
      _sut.keyItems = [];
      _sut.partners = [];
      _sut.equipUpgrades = [EquipUpgrade.BOOTS2];
     
      // Act
      var result = _sut.hasObject(EquipUpgrade.BOOTS2);

      // Assert
      expect(result).toBeTruthy();
    });

    it('should return true if object name is in keyItems', () => {
      // Arrange
      _sut.keyItems = [KeyItem.CAKE];
      _sut.partners = [];
      _sut.equipUpgrades = [];
     
      // Act
      var result = _sut.hasObject(KeyItem.CAKE);

      // Assert
      expect(result).toBeTruthy();
    });

    it('should return true if object name is in partners', () => {
      // Arrange
      _sut.keyItems = [];
      _sut.partners = [Partner.GOOMBARIO];
      _sut.equipUpgrades = [];
     
      // Act
      var result = _sut.hasObject(Partner.GOOMBARIO);

      // Assert
      expect(result).toBeTruthy();
    });
  });

  describe('removeKeyItemsLockedBehindObject', () => {
    it('should remove item when item has object as a requirement in all requirement sets', () => {
      // Arrange
      _sut.keyItems = [KeyItem.LETTER_01];
      var mockLocation = new ItemLocation(
        KeyItem.LETTER_01,
        ItemLocationType.KeyItem,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      KeyItemLocationFactory.getInstance().getAllKeyItemLocations = () => [mockLocation]
     
      // Act
       _sut.removeKeyItemsLockedBehindObject(KeyItem.DOLLY);

      // Assert
      expect(_sut.keyItems.some(ki => ki === KeyItem.LETTER_01)).toBeFalsy();
    });

    it('should not remove item when item has object as a requirement in no requirement sets', () => {
      // Arrange
      _sut.keyItems = [KeyItem.LETTER_01];
      var mockLocation = new ItemLocation(
        KeyItem.LETTER_01,
        ItemLocationType.KeyItem,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      KeyItemLocationFactory.getInstance().getAllKeyItemLocations = () => [mockLocation]
     
      // Act
       _sut.removeKeyItemsLockedBehindObject(KeyItem.RUINS_KEY_1);

      // Assert
      expect(_sut.keyItems.some(ki => ki === KeyItem.LETTER_01)).toBeTruthy();
    });

    it('should not remove item when item has object as a requirement, but not in all requirement sets', () => {
      // Arrange
      _sut.keyItems = [KeyItem.LETTER_01];
      var mockLocation = new ItemLocation(
        KeyItem.LETTER_01,
        ItemLocationType.KeyItem,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      KeyItemLocationFactory.getInstance().getAllKeyItemLocations = () => [mockLocation]
     
      // Act
       _sut.removeKeyItemsLockedBehindObject(KeyItem.JADE_RAVEN);

      // Assert
      expect(_sut.keyItems.some(ki => ki === KeyItem.LETTER_01)).toBeTruthy();
    });

    it('should return a list with the removed items', () => {
      // Arrange
      _sut.keyItems = [KeyItem.LETTER_01];
      var mockLocation = new ItemLocation(
        KeyItem.LETTER_01,
        ItemLocationType.KeyItem,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      KeyItemLocationFactory.getInstance().getAllKeyItemLocations = () => [mockLocation]
     
      // Act
      var result = _sut.removeKeyItemsLockedBehindObject(KeyItem.DOLLY);

      // Assert
      expect(result).toEqual([KeyItem.LETTER_01]);
    });

    it('should return an empty list when no items were removed', () => {
      // Arrange
      _sut.keyItems = [KeyItem.LETTER_01];
      var mockLocation = new ItemLocation(
        KeyItem.LETTER_01,
        ItemLocationType.KeyItem,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      KeyItemLocationFactory.getInstance().getAllKeyItemLocations = () => [mockLocation]
     
      // Act
      var result = _sut.removeKeyItemsLockedBehindObject(KeyItem.FORTRESS_KEY);

      // Assert
      expect(result).toEqual([]);
    });

  });

  describe('removeUpgradesLockedBehindObject', () => {
    it('should remove equip when equip has object as a requirement in all requirement sets', () => {
      // Arrange
      _sut.equipUpgrades = [EquipUpgrade.HAMMER3];
      var mockLocation = new ItemLocation(
        EquipUpgrade.HAMMER3,
        ItemLocationType.EquipUpgrade,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      EquipUpgradeLocationFactory.getInstance().getAllEquipUpgrades = () => [mockLocation]
     
      // Act
       _sut.removeUpgradesLockedBehindObject(KeyItem.DOLLY);

      // Assert
      expect(_sut.equipUpgrades.some(ki => ki === EquipUpgrade.HAMMER3)).toBeFalsy();
    });

    it('should not remove equip when equip has object as a requirement in no requirement sets', () => {
      // Arrange
      _sut.equipUpgrades = [EquipUpgrade.HAMMER3];
      var mockLocation = new ItemLocation(
        EquipUpgrade.HAMMER3,
        ItemLocationType.EquipUpgrade,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      EquipUpgradeLocationFactory.getInstance().getAllEquipUpgrades = () => [mockLocation];
     
      // Act
       _sut.removeUpgradesLockedBehindObject(KeyItem.RUINS_KEY_1);

      // Assert
      expect(_sut.equipUpgrades.some(ki => ki === EquipUpgrade.HAMMER3)).toBeTruthy();
    });

    it('should not remove equip when equip has object as a requirement, but not in all requirement sets', () => {
      // Arrange
      _sut.equipUpgrades = [EquipUpgrade.HAMMER3];
      var mockLocation = new ItemLocation(
        EquipUpgrade.HAMMER3,
        ItemLocationType.EquipUpgrade,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      EquipUpgradeLocationFactory.getInstance().getAllEquipUpgrades = () => [mockLocation];
     
      // Act
       _sut.removeUpgradesLockedBehindObject(KeyItem.JADE_RAVEN);

      // Assert
      expect(_sut.equipUpgrades.some(ki => ki === EquipUpgrade.HAMMER3)).toBeTruthy();
    });

    it('should return a list with the removed items', () => {
      // Arrange
      _sut.equipUpgrades = [EquipUpgrade.HAMMER3];
      var mockLocation = new ItemLocation(
        EquipUpgrade.HAMMER3,
        ItemLocationType.EquipUpgrade,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      EquipUpgradeLocationFactory.getInstance().getAllEquipUpgrades = () => [mockLocation];
     
      // Act
      var result = _sut.removeUpgradesLockedBehindObject(KeyItem.DOLLY);

      // Assert
      expect(result).toEqual([EquipUpgrade.HAMMER3]);
    });

    it('should return an empty list when no equips were removed', () => {
      // Arrange
      _sut.equipUpgrades = [EquipUpgrade.HAMMER3];
      var mockLocation = new ItemLocation(
        EquipUpgrade.HAMMER3,
        ItemLocationType.EquipUpgrade,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      EquipUpgradeLocationFactory.getInstance().getAllEquipUpgrades = () => [mockLocation];
     
      // Act
      var result = _sut.removeUpgradesLockedBehindObject(KeyItem.FORTRESS_KEY);

      // Assert
      expect(result).toEqual([]);
    });

  });

  describe('isAbleToReachLocation', () => {
    it('should return true if player has all objects in all requirement sets', () => {
      // Arrange
      var mockLocation = new ItemLocation(
        EquipUpgrade.HAMMER3,
        ItemLocationType.EquipUpgrade,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      _sut.keyItems = [KeyItem.DOLLY, KeyItem.FORTRESS_KEY, KeyItem.JADE_RAVEN];

      // Act
      var result = _sut.isAbleToReachLocation(mockLocation);

      // Assert
      expect(result).toBeTruthy();
    });

    it('should return true if player has all objects in one of the requirement sets', () => {
      // Arrange
      var mockLocation = new ItemLocation(
        EquipUpgrade.HAMMER3,
        ItemLocationType.EquipUpgrade,
        [
            [KeyItem.DOLLY, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      _sut.keyItems = [KeyItem.DOLLY, KeyItem.JADE_RAVEN];

      // Act
      var result = _sut.isAbleToReachLocation(mockLocation);

      // Assert
      expect(result).toBeTruthy();
    });

    it('should return false if player is missing one or more objects in all the requirement sets', () => {
      // Arrange
      var mockLocation = new ItemLocation(
        EquipUpgrade.HAMMER3,
        ItemLocationType.EquipUpgrade,
        [
            [KeyItem.LETTER_01, KeyItem.FORTRESS_KEY],
            [KeyItem.DOLLY, KeyItem.JADE_RAVEN]
        ],
        'location',
        0         
      );
      _sut.keyItems = [KeyItem.DOLLY, KeyItem.FORTRESS_KEY];

      // Act
      var result = _sut.isAbleToReachLocation(mockLocation);

      // Assert
      expect(result).toBeFalsy();
    });
  });

});
