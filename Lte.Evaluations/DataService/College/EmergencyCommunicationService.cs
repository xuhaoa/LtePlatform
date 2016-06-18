using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Abp.EntityFramework.Repositories;

namespace Lte.Evaluations.DataService.College
{
    public class EmergencyCommunicationService
    {
        private readonly IEmergencyCommunicationRepository _repository;

        public EmergencyCommunicationService(IEmergencyCommunicationRepository repository)
        {
            _repository = repository;
        }

        public int Dump(EmergencyCommunicationDto dto)
        {
            return
                _repository
                    .ImportOne<IEmergencyCommunicationRepository, EmergencyCommunication, EmergencyCommunicationDto>(dto);
        }
    }
}
