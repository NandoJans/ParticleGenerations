import {Injectable} from '@angular/core';
import {PrestigeLayer} from "../classes/features/prestiges/prestige-layer";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {Num} from "../num";
import {Styles} from "../classes/enums/styles";
import {ResetKey} from "../classes/enums/reset-key";

@Injectable({
  providedIn: 'root'
})
export class PrestigeLayersService {
  static yellowPrestigeLayer: PrestigeLayer = new PrestigeLayer(
    'yellow',
    HoldingRecord.redParticles,
    new Num(1, 1000),
    Styles.YELLOW,
    [
      { holding: HoldingRecord.yellowParticles, basedOnRequiredHolding: false },
      { holding: HoldingRecord.yellowKeys, basedOnRequiredHolding: false },
      { holding: HoldingRecord.yellowPrestiges, basedOnRequiredHolding: false }
    ],
    ResetKey.RED
  );

  static list: PrestigeLayer[] = [
    PrestigeLayersService.yellowPrestigeLayer
  ];

  getList(): PrestigeLayer[] {
    return PrestigeLayersService.list;
  }

  tick(speed: Num): void {
    this.getList().forEach(layer => {
      layer.run(speed);
    });
  }
}
