# Unit and Currency Converter

A GNOME Shell extension that converts measuring units and currency from the search bar.

## Usage

To convert, type in the GNOME Shell search a number followed by the prefix of the unit (`kg`, `sec`, `m`, `usd`, and so on). it can be separated by an space (`15ft`) or not (`15 ft`), it does not matter.

The results will appear on the search results in the shell.

Measuring units are hardcoded in the extension code, but the unit conversion rates are pulled from [WIP finding out an API that provides currency exchange rates], updating them every hour.