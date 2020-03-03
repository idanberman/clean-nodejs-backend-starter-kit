import { VendorDto } from 'src/domain/vendors';

describe('VendorDto.class', () => {
  describe('createFromData.method', () => {
    it('should create DTO', () => {
      const data = {
        id: 3,
        governmentalId: 'Abe23rr',
        name: 'The best vendor',
        contactName: 'anonymous',
        contactPhone: '0547784848',
        email: 'anonymous@gmail.com',
        address: 'The nice street 10',
        city: 'Tel Aviv',
        zipCode: '10202029384',
        budgetClassification: '',
      };

      expect(VendorDto.createFromData(data)).toEqual(data);
    });
  });
});
