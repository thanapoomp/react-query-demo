﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace ReactQueryApi.Models
{
    public partial class UserRole
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }
        public string CreatedByUserId { get; set; }
        public string CreatedDate { get; set; }

        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}