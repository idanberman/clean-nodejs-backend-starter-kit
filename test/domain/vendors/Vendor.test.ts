import { Vendor } from 'src/domain/vendors';

describe('Vendor.class', () => {
  describe('build.method', () => {
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

    it('should build a Vendor entity without id', () => {
      const vendor = Vendor.build(data);
      expect(vendor).toEqual({ ...data, id: undefined });
    });
  });

  describe('toDto.method', () => {
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

    it('should build a VendorDto represented the entity entity', () => {
      const vendor: Vendor = Vendor.build(data);
      expect(data).toEqual({ ...data });
    });
  });
});
