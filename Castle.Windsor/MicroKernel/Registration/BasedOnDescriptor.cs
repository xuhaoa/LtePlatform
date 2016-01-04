﻿// Copyright 2004-2012 Castle Project - http://www.castleproject.org/
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

	using System;
	using System.Collections.Generic;
	using System.ComponentModel;
	using System.Linq;

	using Castle.Core;
	using Castle.MicroKernel.Lifestyle.Scoped;

namespace Castle.MicroKernel.Registration
{
	/// <summary>
	///   Describes how to register a group of related types.
	/// </summary>
	public class BasedOnDescriptor : IRegistration
	{
		private readonly List<Type> potentialBases;
	    private Predicate<Type> ifFilter;
		private Predicate<Type> unlessFilter;

	    public FromDescriptor FromDescriptor { get; }

	    public Action<ComponentRegistration> Configuration { get; private set; }

	    /// <summary>
        ///   Initializes a new instance of the BasedOnDescriptor.
        /// </summary>
        public BasedOnDescriptor(IEnumerable<Type> basedOn, FromDescriptor from, Predicate<Type> additionalFilters)
		{
			potentialBases = basedOn.ToList();
			FromDescriptor = from;
			WithService = new ServiceDescriptor(this);
			If(additionalFilters);
		}

		/// <summary>
		///   Gets the service descriptor.
		/// </summary>
		public ServiceDescriptor WithService { get; }

	    /// <summary>
		///   Allows a type to be registered multiple times.
		/// </summary>
		public FromDescriptor AllowMultipleMatches()
		{
			return FromDescriptor.AllowMultipleMatches();
		}

		/// <summary>
		///   Returns the descriptor for accepting a new type.
		/// </summary>
		/// <typeparam name = "T"> The base type. </typeparam>
		/// <returns> The descriptor for the type. </returns>
		[Obsolete("Calling this method resets registration. If that's what you want, start anew, with Classes.FromAssembly..")]
		[EditorBrowsable(EditorBrowsableState.Never)]
		public BasedOnDescriptor BasedOn<T>()
		{
			return FromDescriptor.BasedOn<T>();
		}

		/// <summary>
		///   Returns the descriptor for accepting a new type.
		/// </summary>
		/// <param name = "basedOn"> The base type. </param>
		/// <returns> The descriptor for the type. </returns>
		[Obsolete("Calling this method resets registration. If that's what you want, start anew, with Classes.FromAssembly...")]
		[EditorBrowsable(EditorBrowsableState.Never)]
		public BasedOnDescriptor BasedOn(Type basedOn)
		{
			return FromDescriptor.BasedOn(basedOn);
		}

		/// <summary>
		///   Adds another type to be accepted as base.
		/// </summary>
		/// <param name = "basedOn"> The base type. </param>
		/// <returns> The descriptor for the type. </returns>
		public BasedOnDescriptor OrBasedOn(Type basedOn)
		{
			potentialBases.Add(basedOn);
			return this;
		}

		/// <summary>
		///   Allows customized configurations of each matching type.
		/// </summary>
		/// <param name = "configurer"> The configuration action. </param>
		/// <returns> </returns>
		public BasedOnDescriptor Configure(Action<ComponentRegistration> configurer)
		{
			Configuration += configurer;
			return this;
		}

		/// <summary>
		///   Allows customized configurations of each matching component with implementation type that is 
		///   assignable to
		///   <typeparamref name = "TComponentImplementationType" />
		///   .
		/// </summary>
		/// <typeparam name = "TComponentImplementationType"> The type assignable from. </typeparam>
		/// <param name = "configurer"> The configuration action. </param>
		/// <returns> </returns>
		public BasedOnDescriptor ConfigureFor<TComponentImplementationType>(Action<ComponentRegistration> configurer)
		{
			return ConfigureIf(r => typeof(TComponentImplementationType).IsAssignableFrom(r.Implementation), configurer);
		}

		/// <summary>
		///   Allows customized configurations of each matching component that satisfies supplied <paramref name = "condition" />.
		/// </summary>
		/// <param name = "condition"> Condition to satisfy </param>
		/// <param name = "configurer"> The configuration action, executed only for components for which <paramref name = "condition" /> evaluates to <c>true</c> . </param>
		/// <returns> </returns>
		public BasedOnDescriptor ConfigureIf(Predicate<ComponentRegistration> condition,
		                                     Action<ComponentRegistration> configurer)
		{
			Configuration += r =>
			{
				if (condition(r))
				{
					configurer(r);
				}
			};
			return this;
		}

		/// <summary>
		///   Allows customized configurations of each matching component that satisfies supplied <paramref name = "condition" /> and alternative configuration for the rest of components.
		/// </summary>
		/// <param name = "condition"> Condition to satisfy </param>
		/// <param name = "configurerWhenTrue"> The configuration action, executed only for components for which <paramref name = "condition" /> evaluates to <c>true</c> . </param>
		/// <param name = "configurerWhenFalse"> The configuration action, executed only for components for which <paramref name = "condition" /> evaluates to <c>false</c> . </param>
		/// <returns> </returns>
		public BasedOnDescriptor ConfigureIf(Predicate<ComponentRegistration> condition,
		                                     Action<ComponentRegistration> configurerWhenTrue,
		                                     Action<ComponentRegistration> configurerWhenFalse)
		{
			Configuration += r =>
			{
				if (condition(r))
				{
					configurerWhenTrue(r);
				}
				else
				{
					configurerWhenFalse(r);
				}
			};
			return this;
		}

		/// <summary>
		///   Assigns a conditional predication which must be satisfied.
		/// </summary>
		/// <param name = "ifFilter"> The predicate to satisfy. </param>
		/// <returns> </returns>
		public BasedOnDescriptor If(Predicate<Type> ifFilter)
		{
			this.ifFilter += ifFilter;
			return this;
		}

		/// <summary>
		///   Assigns a conditional predication which must not be satisfied.
		/// </summary>
		/// <param name = "myUnlessFilter"> The predicate not to satisify. </param>
		/// <returns> </returns>
		public BasedOnDescriptor Unless(Predicate<Type> myUnlessFilter)
		{
			unlessFilter += myUnlessFilter;
			return this;
		}

		/// <summary>
		///   Returns the descriptor for accepting a type based on a condition.
		/// </summary>
		/// <param name = "accepted"> The accepting condition. </param>
		/// <returns> The descriptor for the type. </returns>
		[Obsolete("Calling this method resets registration. If that's what you want, start anew, with Classes.FromAssembly..."
			)]
		[EditorBrowsable(EditorBrowsableState.Never)]
		public BasedOnDescriptor Where(Predicate<Type> accepted)
		{
			return FromDescriptor.Where(accepted);
		}

		/// <summary>
		///   Uses all interfaces implemented by the type (or its base types) as well as their base interfaces.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor WithServiceAllInterfaces()
		{
			return WithService.AllInterfaces();
		}

		/// <summary>
		///   Uses the base type matched on.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor WithServiceBase()
		{
			return WithService.Base();
		}

		/// <summary>
		///   Uses all interfaces that have names matched by implementation type name.
		///   Matches Foo to IFoo, SuperFooExtended to IFoo and IFooExtended etc
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor WithServiceDefaultInterfaces()
		{
			return WithService.DefaultInterfaces();
		}

		/// <summary>
		///   Uses the first interface of a type. This method has non-deterministic behavior when type implements more than one interface!
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor WithServiceFirstInterface()
		{
			return WithService.FirstInterface();
		}

		/// <summary>
		///   Uses <paramref name = "implements" /> to lookup the sub interface.
		///   For example: if you have IService and 
		///   IProductService : ISomeInterface, IService, ISomeOtherInterface.
		///   When you call FromInterface(typeof(IService)) then IProductService
		///   will be used. Useful when you want to register _all_ your services
		///   and but not want to specify all of them.
		/// </summary>
		/// <param name = "implements"> </param>
		/// <returns> </returns>
		public BasedOnDescriptor WithServiceFromInterface(Type implements)
		{
			return WithService.FromInterface(implements);
		}

		/// <summary>
		///   Uses base type to lookup the sub interface.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor WithServiceFromInterface()
		{
			return WithService.FromInterface();
		}

		/// <summary>
		///   Assigns a custom service selection strategy.
		/// </summary>
		/// <param name = "selector"> </param>
		/// <returns> </returns>
		public BasedOnDescriptor WithServiceSelect(ServiceDescriptor.ServiceSelector selector)
		{
			return WithService.Select(selector);
		}

		/// <summary>
		///   Uses the type itself.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor WithServiceSelf()
		{
			return WithService.Self();
		}

		/// <summary>
		///   Sets component lifestyle to specified one.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestyleCustom(Type customLifestyleType)
		{
			return Configure(c => c.LifestyleCustom(customLifestyleType));
		}

		/// <summary>
		///   Sets component lifestyle to specified one.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestyleCustom<TLifestyleManager>() where TLifestyleManager : ILifestyleManager, new()
		{
			return Configure(c => c.LifestyleCustom<TLifestyleManager>());
		}

		/// <summary>
		///   Sets component lifestyle to per thread.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestylePerThread()
		{
			return Configure(c => c.LifestylePerThread());
		}

		/// <summary>
		///   Sets component lifestyle to scoped per explicit scope.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestyleScoped()
		{
			return Configure(c => c.LifestyleScoped());
		}

		/// <summary>
		///   Sets component lifestyle to scoped per explicit scope.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestyleScoped(Type scopeAccessorType)
		{
			return Configure(c => c.LifestyleScoped(scopeAccessorType));
		}

		/// <summary>
		///   Sets component lifestyle to scoped per explicit scope.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestyleScoped<TScopeAccessor>() where TScopeAccessor : IScopeAccessor, new()
		{
			return Configure(c => c.LifestyleScoped<TScopeAccessor>());
		}

		/// <summary>
		///   Sets component lifestyle to scoped per component <typeparamref name = "TBaseForRoot" />.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestyleBoundTo<TBaseForRoot>() where TBaseForRoot : class
		{
			return Configure(c => c.LifestyleBoundTo<TBaseForRoot>());
		}

		/// <summary>
		///   Sets component lifestyle to scoped per nearest component on the resolution stack where implementation type is assignable to <typeparamref name = "TBaseForRoot" /> .
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestyleBoundToNearest<TBaseForRoot>() where TBaseForRoot : class
		{
			return Configure(c => c.LifestyleBoundToNearest<TBaseForRoot>());
		}

#if !(SILVERLIGHT || CLIENTPROFILE)
		/// <summary>
		///   Sets component lifestyle to instance per web request.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestylePerWebRequest()
		{
			return Configure(c => c.LifestylePerWebRequest());
		}
#endif

		/// <summary>
		///   Sets component lifestyle to pooled. If <paramref name = "initialSize" /> or <paramref name = "maxSize" /> are not set default values will be used.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestylePooled(int? initialSize = null, int? maxSize = null)
		{
			return Configure(c => c.LifestylePooled(initialSize, maxSize));
		}

		/// <summary>
		///   Sets component lifestyle to singleton.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestyleSingleton()
		{
			return Configure(c => c.LifestyleSingleton());
		}

		/// <summary>
		///   Sets component lifestyle to transient.
		/// </summary>
		/// <returns> </returns>
		public BasedOnDescriptor LifestyleTransient()
		{
			return Configure(c => c.LifestyleTransient());
		}

		/// <summary>
		///   Assigns the supplied service types.
		/// </summary>
		/// <param name = "types"> </param>
		/// <returns> </returns>
		public BasedOnDescriptor WithServices(IEnumerable<Type> types)
		{
			return WithService.Select(types);
		}

		/// <summary>
		///   Assigns the supplied service types.
		/// </summary>
		/// <param name = "types"> </param>
		/// <returns> </returns>
		public BasedOnDescriptor WithServices(params Type[] types)
		{
			return WithService.Select(types);
		}

		public virtual bool Accepts(Type type, out Type[] baseTypes)
		{
			return IsBasedOn(type, out baseTypes)
			       && ExecuteIfCondition(type)
			       && ExecuteUnlessCondition(type) == false;
		}

		protected bool ExecuteIfCondition(Type type)
		{
		    return ifFilter == null || ifFilter.GetInvocationList().Cast<Predicate<Type>>().All(filter => filter(type));
		}

	    protected bool ExecuteUnlessCondition(Type type)
		{
		    return unlessFilter != null && unlessFilter.GetInvocationList().Cast<Predicate<Type>>().Any(filter => filter(type));
		}

	    protected bool IsBasedOn(Type type, out Type[] baseTypes)
		{
			var actuallyBasedOn = new List<Type>();
			foreach (var potentialBase in potentialBases)
			{
				if (potentialBase.IsAssignableFrom(type))
				{
					actuallyBasedOn.Add(potentialBase);
				}
				else if (potentialBase.IsGenericTypeDefinition)
				{
					if (potentialBase.IsInterface)
					{
						if (IsBasedOnGenericInterface(type, potentialBase, out baseTypes))
						{
							actuallyBasedOn.AddRange(baseTypes);
						}
					}

					if (IsBasedOnGenericClass(type, potentialBase, out baseTypes))
					{
						actuallyBasedOn.AddRange(baseTypes);
					}
				}
			}
			baseTypes = actuallyBasedOn.Distinct().ToArray();
			return baseTypes.Length > 0;
		}

		public bool TryRegister(Type type, IKernel kernel)
		{
			Type[] baseTypes;

			if (!Accepts(type, out baseTypes))
			{
				return false;
			}
			var defaults = CastleComponentAttribute.GetDefaultsFor(type);
			var serviceTypes = WithService.GetServices(type, baseTypes);
			if (serviceTypes.Count == 0 && defaults.Services.Length > 0)
			{
				serviceTypes = defaults.Services;
			}
			var registration = Component.For(serviceTypes);
			registration.ImplementedBy(type);

		    Configuration?.Invoke(registration);
		    if (string.IsNullOrEmpty(registration.Name) && !string.IsNullOrEmpty(defaults.Name))
			{
				registration.Named(defaults.Name);
			}
			else
			{
				registration.RegisterOptionally();
			}
			kernel.Register(registration);
			return true;
		}

		private static bool IsBasedOnGenericClass(Type type, Type basedOn, out Type[] baseTypes)
		{
			while (type != null)
			{
				if (type.IsGenericType &&
				    type.GetGenericTypeDefinition() == basedOn)
				{
					baseTypes = new[] { type };
					return true;
				}

				type = type.BaseType;
			}
			baseTypes = null;
			return false;
		}

		private static bool IsBasedOnGenericInterface(Type type, Type basedOn, out Type[] baseTypes)
		{
			var types = new List<Type>(4);
			foreach (var @interface in type.GetInterfaces().Where(@interface => @interface.IsGenericType && @interface.GetGenericTypeDefinition() == basedOn))
			{
			    if (@interface.ReflectedType == null &&
			        @interface.ContainsGenericParameters)
			    {
			        types.Add(@interface.GetGenericTypeDefinition());
			    }
			    else
			    {
			        types.Add(@interface);
			    }
			}
		    baseTypes = types.ToArray();
			return baseTypes.Length > 0;
		}

		void IRegistration.Register(IKernelInternal kernel)
		{
			((IRegistration)FromDescriptor).Register(kernel);
		}
	}
}