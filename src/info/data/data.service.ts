import { Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/interfaces';
import { plainToClass } from 'class-transformer';
import { UpdateDataRequest as UpdateDataRequestInterface } from '../interfaces';
import { UpdateDataRequest } from '../models';
import { validate } from 'class-validator';
import { coherentAges } from '../models';
import { over18MarriedEmpty } from '../models';

@Injectable({})
export class DataService {
  async validateData(
    rawData: UpdateDataRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateDataRequest, rawData);
    const validationErrors = await validate(data);
    let customValidationE = [];

    // implementing coherent age logic and married logic here.//
    // i would rather prefer implementing validation logic all in models/index.ts but couldn't make it yet.

    !coherentAges(rawData.age, rawData.birth) &&
      (customValidationE = [{ custom: 'error not coherent age' }]);

    over18MarriedEmpty(rawData.age, rawData.sposato) &&
      (customValidationE = [{ custom: 'married? over 18 must answer' }]);

    //////////////////    responses     ///////
    if (validationErrors.length > 0 || customValidationE.length > 0) {
      return {
        success: false,
        errors: validationErrors,
        customErrors: customValidationE,
      };
    }
    return {
      success: true,
      data,
    };
  }
}
