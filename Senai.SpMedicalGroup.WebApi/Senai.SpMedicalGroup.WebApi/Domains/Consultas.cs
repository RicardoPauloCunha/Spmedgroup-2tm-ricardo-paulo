﻿using System;
using System.Collections.Generic;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Consultas
    {
        public int Id { get; set; }
        public int IdProntuario { get; set; }
        public int IdMedico { get; set; }
        public DateTime DataAgendada { get; set; }
        public TimeSpan HoraAgendada { get; set; }
        public int IdSituacao { get; set; }
        public string Descricao { get; set; }

        public Medicos IdMedicoNavigation { get; set; }
        public Prontuarios IdProntuarioNavigation { get; set; }
        public Situacao IdSituacaoNavigation { get; set; }
    }
}
