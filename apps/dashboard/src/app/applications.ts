// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IFairnessData } from "@responsible-ai/fairness";
import { IExplanationDashboardData } from "@responsible-ai/interpret";

import { binaryClassifier } from "../fairness/__mock_data__/binaryClassifier";
import { precomputedBinary } from "../fairness/__mock_data__/precomputedBinary";
import { precomputedBinaryTwo } from "../fairness/__mock_data__/precomputedBinaryTwo";
import { probit } from "../fairness/__mock_data__/probit";
import { regression } from "../fairness/__mock_data__/regression";
import { automlMimicAdult } from "../interpret/__mock_data__/automlMimicAdult";
import { bostonData } from "../interpret/__mock_data__/bostonData";
import { bostonDataGlobal } from "../interpret/__mock_data__/bostonDataGlobal";
import { bostonDataNoDataset } from "../interpret/__mock_data__/bostonDataNoDataset";
import { bostonDataNoY } from "../interpret/__mock_data__/bostonDataNoY";
import { breastCancerData } from "../interpret/__mock_data__/breastCancerData";
import { ebmData } from "../interpret/__mock_data__/ebmData";
import { ibmData } from "../interpret/__mock_data__/ibmData";
import { ibmDataInconsistent } from "../interpret/__mock_data__/ibmDataInconsistent";
import { ibmNoClass } from "../interpret/__mock_data__/ibmNoClass";
import { irisData } from "../interpret/__mock_data__/irisData";
import { irisDataNoLocal } from "../interpret/__mock_data__/irisDataNoLocal";
import { irisGlobal } from "../interpret/__mock_data__/irisGlobal";
import { irisNoData } from "../interpret/__mock_data__/irisNoData";
import { irisNoFeatures } from "../interpret/__mock_data__/irisNoFeatures";
import { largeFeatureCount } from "../interpret/__mock_data__/largeFeatureCount";

export interface IInterpretDataSet {
  data: IExplanationDashboardData;
  classDimension: number;
}

export interface IFairLearnDataSet {
  data: IFairnessData;
}

export interface IDataSet<TDataSet> {
  datasets: { [key: string]: TDataSet };
}

export interface IInterpretSetting {
  versions: { [key: string]: 1 | 2 };
}

export interface IFairLearnSetting {
  versions: { [key: string]: 1 | 2 };
}

export const applicationKeys = <const>["interpret", "fairness"];

export type IApplications = {
  [key in typeof applicationKeys[number]]: unknown;
} & {
  fairness: IFairLearnSetting & IDataSet<IFairLearnDataSet>;
  interpret: IInterpretSetting & IDataSet<IInterpretDataSet>;
};

export const applications: IApplications = <const>{
  fairness: {
    datasets: {
      binaryClassifier: { data: binaryClassifier },
      precomputedBinary: { data: precomputedBinary },
      precomputedBinaryTwo: { data: precomputedBinaryTwo },
      probit: { data: probit },
      regression: { data: regression }
    },
    versions: { "Version-1": 1, "Version-2": 2 }
  },
  interpret: {
    datasets: {
      automlMimicAdult: { classDimension: 3, data: automlMimicAdult },
      bostonData: { classDimension: 1, data: bostonData },
      bostonDataGlobal: { classDimension: 1, data: bostonDataGlobal },
      bostonDataNoDataset: { classDimension: 1, data: bostonDataNoDataset },
      bostonDataNoY: { classDimension: 1, data: bostonDataNoY },
      breastCancerData: { classDimension: 2, data: breastCancerData },
      ebmData: { classDimension: 2, data: ebmData },
      ibmData: { classDimension: 2, data: ibmData },
      ibmDataInconsistent: { classDimension: 2, data: ibmDataInconsistent },
      ibmNoClass: { classDimension: 2, data: ibmNoClass },
      irisData: { classDimension: 3, data: irisData },
      irisDataNoLocal: { classDimension: 3, data: irisDataNoLocal },
      irisGlobal: { classDimension: 3, data: irisGlobal },
      irisNoData: { classDimension: 3, data: irisNoData },
      irisNoFeatures: { classDimension: 3, data: irisNoFeatures },
      largeFeatureCount: { classDimension: 2, data: largeFeatureCount }
    },
    versions: { "Version-1": 1, "Version-2": 2 }
  }
};