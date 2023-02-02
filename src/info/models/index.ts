import { UpdateInfoRequest as UpdateInfoRequestInterface } from '../interfaces';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UpdateDataRequest as UpdateDataRequestInterface } from '../interfaces';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export class UpdateInfoRequest implements UpdateInfoRequestInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
// custom class validator. 1
// validator constraint for checking age logic.

@ValidatorConstraint({ name: 'ageBetween1&150', async: false })
export class AgeBetween implements ValidatorConstraintInterface {
  validate(age: number) {
    return age > 1 && age < 150;
  }
  defaultMessage() {
    return 'Age out of range (1 to 150)';
  }
}

// i was trying to make the birth coherence logic within a class constraint validator, but i got stuck. cannot reach age variable inside this class.

// @ValidatorConstraint({ name: 'birthCoherentAge', async: false })
// export class BirthCoherentAge implements ValidatorConstraintInterface {
//   validate(birth: string) {
//     const birthYear = Number(birth.slice(0, 4));
//     const birthMonth = Number(birth.slice(5, 7));
//     const birthDay = Number(birth.slice(8, 10));
//     const currentYear = new Date().getFullYear();
//     const currentMonth = new Date().getMonth() + 1;
//     const currentDay = new Date().getDate();
//     if (currentMonth != birthMonth)
//       return currentMonth > birthMonth
//         ? currentYear - birthYear === age /*(age)*/
//         : currentYear - 1 - birthYear === age; /*(age)*/
//     if (currentMonth === birthMonth)
//       return currentDay >= birthDay
//         ? currentYear - birthYear === age /*(age)*/
//         : currentYear - 1 - birthYear === age; /*(age)*/
//   }
//   defaultMessage() {
//     return 'Age not coherent with birth data';
//   }
// }

//birth coherence logic exported as a function. not what i would like the most but still works.

// custom function validator. 2
export function coherentAges(age, birth) {
  const birthYear = Number(birth.slice(0, 4));
  const birthMonth = Number(birth.slice(5, 7));
  const birthDay = Number(birth.slice(8, 10));
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  if (currentMonth != birthMonth)
    return currentMonth > birthMonth
      ? currentYear - birthYear === Number(age)
      : currentYear - 1 - birthYear === Number(age);
  if (currentMonth === birthMonth)
    return currentDay >= birthDay
      ? currentYear - birthYear === Number(age)
      : currentYear - 1 - birthYear === Number(age);
}

// custom function validator 3

// just checks if over 18 and sposato field is not empty. return boolean.
export function over18MarriedEmpty(age, married) {
  if (Number(age) >= 18) return married.length === 0;
}

export class UpdateDataRequest implements UpdateDataRequestInterface {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;
  @IsNotEmpty()
  @Validate(AgeBetween)
  age: number;
  // @Validate(BirthCoherentAge)//not working as expected.
  birth: string;
  sposato: string;
}
