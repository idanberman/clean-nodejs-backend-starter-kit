import { UseCaseInputErrorDescription } from 'src/domain/errors/operation';

describe('UseCaseInputErrorDescription.class', () => {
  describe('withSection.method', () => {
    it('should return new value with the new section value when section was undefined', () => {
      const errors = ['err1', 'err2'];
      const at = 'password';
      const description = new UseCaseInputErrorDescription(errors, at);
      const section = 'new section';
      expect(description.at).toEqual(at);
      expect(description.errors).toEqual(errors);
      expect(description.section).toBeUndefined();
      const newDescription = description.withSection(section);
      expect(description.at).toEqual(newDescription.at);
      expect(description.errors).toEqual(newDescription.errors);
      expect(newDescription.section).toEqual(section);
      expect(newDescription).toEqual(
        new UseCaseInputErrorDescription(errors, at, section),
      );
    });
    it('should return new value with the new section value when section was defined', () => {
      const errors = ['err1', 'err2'];
      const at = 'password';
      const section = 'old section';
      const description = new UseCaseInputErrorDescription(errors, at, section);
      const newSection = 'new section';
      expect(description.at).toEqual(at);
      expect(description.errors).toEqual(errors);
      expect(description.section).toEqual(section);
      const newDescription = description.withSection(newSection);
      expect(description.at).toEqual(newDescription.at);
      expect(description.errors).toEqual(newDescription.errors);
      expect(newDescription.section).toEqual(newSection);
      expect(newDescription).toEqual(
        new UseCaseInputErrorDescription(errors, at, newSection),
      );
    });
  });

  describe('concat.method', () => {
    it('should add new error at(UseCaseInputErrorDescription.at) place that is not exist in the array', () => {
      const errors1 = [
        'password too short',
        'password can contain only numbers',
      ];
      const at1 = 'password1';
      const section1 = 'section1';
      const description1 = new UseCaseInputErrorDescription(
        errors1,
        at1,
        section1,
      );
      const errors2 = ['email invalid'];
      const at2 = 'email2';
      const section2 = 'section2';
      const description2 = new UseCaseInputErrorDescription(
        errors2,
        at2,
        section2,
      );

      const errors3 = ['phone number is invalid'];
      const at3 = 'phone3';
      const section3 = 'section3';
      const description3 = new UseCaseInputErrorDescription(
        errors3,
        at3,
        section3,
      );

      const array = [description1, description2];
      const newList = description3.concat(array);

      expect(newList).toHaveLength(3);
      expect(newList).toEqual([description1, description2, description3]);
    });
  });

  describe('concat.method', () => {
    it('should add new error to empty list', () => {
      const errors1 = [
        'password too short',
        'password can contain only numbers',
      ];
      const at1 = 'password1';
      const section1 = 'section1';
      const description1 = new UseCaseInputErrorDescription(
        errors1,
        at1,
        section1,
      );

      const array = [];
      const newList = description1.concat(array);

      expect(newList).toHaveLength(1);
      expect(newList).toEqual([description1]);
    });
  });

  describe('concat.method', () => {
    it('should add new error at(UseCaseInputErrorDescription.at) place that is exist in the array', () => {
      const errors1 = [
        'password too short',
        'password can contain only numbers',
      ];
      const at1 = 'password1';
      const section1 = 'section1';
      const description1 = new UseCaseInputErrorDescription(
        errors1,
        at1,
        section1,
      );
      const errors2 = ['email invalid'];
      const at2 = 'email2';
      const section2 = 'userDetails';
      const description2 = new UseCaseInputErrorDescription(
        errors2,
        at2,
        section2,
      );

      const errors3 = ['mail is banned from the system'];
      const at3 = 'email2';
      const section3 = 'userDetails';
      const description3 = new UseCaseInputErrorDescription(
        errors3,
        at3,
        section3,
      );

      const array = [description1, description2];
      const newList = description3.concat(array);

      expect(at2).toEqual(at3);
      expect(section2).toEqual(section3);

      expect(newList).toHaveLength(2);
      expect(newList[0]).toEqual(description1);

      expect(newList[1].at).toEqual(at2);
      expect(newList[1].section).toEqual(section2);
      const expectedErrorSet = Array.from(new Set([...errors2, ...errors3]));
      const actualSet = Array.from(new Set(newList[1].errors));
      expect(actualSet).toEqual(expect.arrayContaining(expectedErrorSet));
      expect(actualSet.length).toEqual(2);
      expect(expectedErrorSet.length).toEqual(2);
    });
  });
});
