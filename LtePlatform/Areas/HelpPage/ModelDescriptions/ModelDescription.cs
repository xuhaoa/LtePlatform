using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace LtePlatform.Areas.HelpPage.ModelDescriptions
{
    /// <summary>
    /// Describes a type model.
    /// </summary>
    public abstract class ModelDescription
    {
        public string Documentation { get; set; }

        public string ParameterDocumentation { get; set; }

        public Type ModelType { get; set; }

        public string Name { get; set; }

        public abstract IList<ParameterDescription> GetParameterDescriptions();
    }

    public class SimpleTypeModelDescription : ModelDescription
    {
        public override IList<ParameterDescription> GetParameterDescriptions()
        {
            return null;
        }
    }

    public class EnumTypeModelDescription : ModelDescription
    {
        public EnumTypeModelDescription()
        {
            Values = new Collection<EnumValueDescription>();
        }

        public Collection<EnumValueDescription> Values { get; private set; }

        public override IList<ParameterDescription> GetParameterDescriptions()
        {
            return null;
        }
    }

    public class CollectionModelDescription : ModelDescription
    {
        public ModelDescription ElementDescription { get; set; }

        public override IList<ParameterDescription> GetParameterDescriptions()
        {
            var complexTypeModelDescription = ElementDescription as ComplexTypeModelDescription;
            return complexTypeModelDescription?.Properties;
        }
    }

    public class ComplexTypeModelDescription : ModelDescription
    {
        public ComplexTypeModelDescription()
        {
            Properties = new Collection<ParameterDescription>();
        }

        public Collection<ParameterDescription> Properties { get; private set; }

        public override IList<ParameterDescription> GetParameterDescriptions()
        {
            return Properties;
        }
    }

    public class KeyValuePairModelDescription : ModelDescription
    {
        public ModelDescription KeyModelDescription { get; set; }

        public ModelDescription ValueModelDescription { get; set; }

        public override IList<ParameterDescription> GetParameterDescriptions()
        {
            return null;
        }
    }
    
}