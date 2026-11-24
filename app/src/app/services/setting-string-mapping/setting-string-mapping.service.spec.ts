import { TestBed } from '@angular/core/testing';

import { SettingStringMappingService } from './setting-string-mapping.service';
import { RandomizerPageComponent } from 'src/app/pages/home/randomizer-page/randomizer-page.component';

describe('SettingStringMappingService', () => {
  let service: SettingStringMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingStringMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should import a pre-0.32.0 settings string', () => {
    const legacyString = '(iIVEjnSpf0Kd0l0r!0g2@2u2a6o1M)(gb3f3p3s0Rzm2o)(ps2aRn1x1(pGktpbwsl))(qh3SIPZgc2ELt3DQFVy1O)(dd1ca1.5m1kshlvOyp0!0@3b)(xq100r0t0Xubpl128)(mc150h10f5b3l1ws0j0a0i00150041rn0x16)(om0btwcrFPs65796o2d1z0)(lp5w0r0s@0$5?0!0y0#0x)(cm8p20g20k20o20a20b20w20s20l20x2n2e2y2c5trhdu2j)g)';
    const page = new RandomizerPageComponent(null, null, null, null, null, null);
    page.initFormGroup();
    const form = page.formGroup;

    expect(() => service.decompressFormGroup(legacyString, form, service.settingsMap)).not.toThrow();
    expect(form.get('items').get('shuffleItems').value).toBe(true);
    expect(form.get('marioStats').get('startingCoins').value).toBe(150);
    expect(form.get('partners').get('partnerUpgradeShuffle').value).toBe(2);
  });

  it('should read a legacy toggle for random starting items', () => {
    const page = new RandomizerPageComponent(null, null, null, null, null, null);
    page.initFormGroup();
    const form = page.formGroup;

    service.decompressFormGroup('(mRn0x16)', form, service.settingsMap);

    expect(form.get('marioStats').get('startWithRandomItems').value).toBe(1);
  });
});
