import { useMemo } from 'react';
import { generateProducts } from '../data/productsGenerator';

export const useServiceFetcher = (selectedCategory = 'ALL', searchQuery = '') => {
  const allData = useMemo(() => generateProducts(5000), []);

  const servicesOnly = useMemo(() => {
    return allData.filter(item => item.isService);
  }, [allData]);

  const filteredServices = useMemo(() => {
    return servicesOnly.filter(service => {
      const matchesCategory = selectedCategory === 'ALL' || service.category === selectedCategory || service.categoryId === selectedCategory;
      const matchesQuery = searchQuery === '' || 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesQuery;
    });
  }, [servicesOnly, selectedCategory, searchQuery]);

  return {
    services: filteredServices,
    totalCount: filteredServices.length,
    allServicesCount: servicesOnly.length
  };
};
