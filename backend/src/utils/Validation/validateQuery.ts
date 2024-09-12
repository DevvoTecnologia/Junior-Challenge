// import { measure_type } from '../../modules/measure/Measure';
import { CustomException } from '../CustomException';

export function validateQuery(values: unknown): unknown {
  // const typesToCheck = String(measure_type).split(',');
  // const measureType = values['measure_type'];
  // const upperedMeasureType = String(measureType).toUpperCase();
  try {
    // if (measureType && measureType.length > 0) {
    //   if (!typesToCheck.includes(upperedMeasureType)) {
    //     throw new Error();
    //   }
    // }
    // return measureType ? { measure_type: upperedMeasureType } : {};
    return true;
  } catch (e) {
    throw new CustomException({
      errorCode: 'INVALID_TYPE',
      errorDescription: 'Tipo de medição não permitida',
      statusCode: 400,
    });
  }
}
