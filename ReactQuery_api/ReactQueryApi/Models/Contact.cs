﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace ReactQueryApi.Models
{
    public partial class Contact
    {
        public Guid Id { get; set; }
        public Guid? TitleId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool? IsActive { get; set; }
        public Guid? CreatedUserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? UpdatedUserId { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual User CreatedUser { get; set; }
        public virtual Title Title { get; set; }
        public virtual User UpdatedUser { get; set; }
    }
}