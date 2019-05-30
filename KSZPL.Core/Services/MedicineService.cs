using AutoMapper;
using KSZPL.Core.Dtos.Medicine;
using KSZPL.Core.Interfaces;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Services
{
    public class MedicineService : IMedicineService
    {
        private readonly IRepository<Medicine> _repositoryMedicine;
        private readonly IMapper _mapper;

        public MedicineService(IRepository<Medicine> repositoryMedicine,  IMapper mapper)
        {
            _repositoryMedicine = repositoryMedicine;
            _mapper = mapper;
        }

        public List<GetMedicineDto> GetMedicines()
        {
            var allMedicines = _repositoryMedicine.GetAll();

            List<GetMedicineDto> listMedicines = new List<GetMedicineDto>();

            foreach (var medicine in allMedicines)
            {
                listMedicines.Add(new GetMedicineDto
                {
                    value = medicine.Name,
                    label = medicine.Name
                });
            }

            return listMedicines;
        }
    }
}
