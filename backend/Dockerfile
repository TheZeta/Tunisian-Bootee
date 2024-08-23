FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["TunisianBootie.Api/TunisianBootie.Api.csproj", "TunisianBootie.Api/"]
RUN dotnet restore "TunisianBootie.Api/TunisianBootie.Api.csproj"
COPY . .
WORKDIR "/src/TunisianBootie.Api"
RUN dotnet build "TunisianBootie.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TunisianBootie.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TunisianBootie.Api.dll"]
