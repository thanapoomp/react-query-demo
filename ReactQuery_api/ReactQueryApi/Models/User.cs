﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace ReactQueryApi.Models
{
    public partial class User:IId
    {
        public User()
        {
            ContactCreatedUsers = new HashSet<Contact>();
            ContactUpdatedUsers = new HashSet<Contact>();
            ProductCreatedUsers = new HashSet<Product>();
            ProductGroupCreatedUsers = new HashSet<ProductGroup>();
            ProductGroupUpdatedUsers = new HashSet<ProductGroup>();
            ProductUpdatedUsers = new HashSet<Product>();
            TitleCreatedUsers = new HashSet<Title>();
            TitleUpdatedUsers = new HashSet<Title>();
            UserRoles = new HashSet<UserRole>();
        }

        public Guid Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string CreatedDate { get; set; }

        public virtual ICollection<Contact> ContactCreatedUsers { get; set; }
        public virtual ICollection<Contact> ContactUpdatedUsers { get; set; }
        public virtual ICollection<Product> ProductCreatedUsers { get; set; }
        public virtual ICollection<ProductGroup> ProductGroupCreatedUsers { get; set; }
        public virtual ICollection<ProductGroup> ProductGroupUpdatedUsers { get; set; }
        public virtual ICollection<Product> ProductUpdatedUsers { get; set; }
        public virtual ICollection<Title> TitleCreatedUsers { get; set; }
        public virtual ICollection<Title> TitleUpdatedUsers { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}