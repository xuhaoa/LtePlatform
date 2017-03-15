﻿using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Regular;

namespace Lte.Domain.Common.Geo
{
    public interface ITownId
    {
        int TownId { get; set; }
    }

    public interface IDistrictTown
    {
        string District { get; set; }

        string Town { get; set; }
    }

    public interface ICityDistrictTown : IDistrictTown
    {
        string City { get; set; }
    }

    public interface ICityDistrict
    {
        string City { get; set; }

        string District { get; set; }
    }

    public interface IArea
    {
        string Area { get; set; }
    }

    public static class CityDistrictQueries
    {
        public static IEnumerable<TDistrictView> Merge<TDistrictView, TTownView>(this IEnumerable<TTownView> townPreciseViews,
            Func<TTownView, TDistrictView> constructView)
            where TDistrictView : ICityDistrict
            where TTownView : class, ICityDistrictTown, new()
        {
            var preciseViews = townPreciseViews as TTownView[] ?? townPreciseViews.ToArray();
            if (!preciseViews.Any()) return null;
            var districts = preciseViews.Select(x => x.District).Distinct();
            var city = preciseViews.ElementAt(0).City;
            return districts.Select(district =>
            {
                var view =
                    constructView(preciseViews.Where(x => x.District == district).ArraySum());
                view.City = city;
                view.District = district;
                return view;
            }).ToList();
        }
    }

    public interface ITown
    {
        string CityName { get; set; }

        string DistrictName { get; set; }

        string TownName { get; set; }
    }

    public interface IENodebId
    {
        int ENodebId { get; set; }
    }
}
