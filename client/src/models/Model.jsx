/**
 * SESSION MODELATION
 * @param { Object } session - data for modelation
 */
export class SessionModelation {
  constructor(session) {
    this.session = session;
  }
  getSession() {
    const mapData = this.session?.sessions?.map((item, index) => {
      // eslint-disable-next-line default-case
      switch (item.day) {
        case 1:
          item.day = "L";
          break;
        case 2:
          item.day = "M";
          break;
        case 3:
          item.day = "M";
          break;
        case 4:
          item.day = "J";
          break;
        case 5:
          item.day = "V";
          break;
        case 6:
          item.day = "S";
          break;
        case 7:
          item.day = "D";
          break;
      }
      const itemName = index + 1;
      return {
        name: itemName,
        uv: item?.sessionLength,
        pv: item.day,
      };
    });
    return mapData;
  }
}

/**
 * ACTIVITY MODELATION
 * @param { Object } activity - data for modelation
 */
export class ActivityModelation {
  constructor(activity) {
    this.activity = activity;
  }
  getActivity() {
    const mapData = this.activity?.sessions.map((item, index) => {
      const itemName = index + 1;
      return {
        name: itemName,
        uv: item?.calories,
        pv: item?.kilogram,
      };
    });
    return mapData;
  }
}

/**
 * PERFORMANCE MODELATION
 * @param { Object } perfData - data for modelation
 */
export class PerformanceModelation {
  constructor(perfData) {
    this.perfData = perfData;
  }
  getPerformance() {
    const mapData = this.perfData?.map((item) => {
      // eslint-disable-next-line default-case
      switch (item.kind) {
        case 1:
          item.kind = "Cardio";
          break;
        case 2:
          item.kind = "Energy";
          break;
        case 3:
          item.kind = "Endurance";
          break;
        case 4:
          item.kind = "Strength";
          break;
        case 5:
          item.kind = "Speed";
          break;
        case 6:
          item.kind = "Intensity";
          break;
      }
      return {
        subject: item.kind,
        A: item.value,
        B: item.value,
        fullMark: 0,
      };
    });
    return mapData;
  }
}

/**
 * SCORE MODELATION
 * @param { Object } score - data for modelation
 * @param { int } ref - reference data for percentage calculation
 */
export class ScoreModelation {
  constructor(score, ref) {
    this.score = score;
    this.ref = ref;
  }
  getScore() {
    const data = [
      { name: "MAIN", value: this.score },
      { name: "REF", value: this.ref },
    ];
    const mapData = data.map((item, index) => {
      return {
        name: "USER",
        value: item.value,
      };
    });
    return mapData;
  }
}
