# Unit and Currency Converter

A GNOME Shell extension that converts measuring units and currency from the search bar.

## IT IS A WORK-IN-PROGRESS (NOT EVEN ALPHA!). NOTHING WORKS YET

## Usage

To convert, type in the GNOME Shell search a number followed by a space and in the end the prefix of the unit (`kg`, `sec`, `m`, `usd`, and so on).

The results will appear on the search results in the shell.

Measuring units are hardcoded in the extension code.
In the future, currency conversion rates will be pulled from an external API, updated every hour.

### Planned Features

- [ ] **Currency conversion:**
      If you know about a suitable API that provides currency exchange rates which can be updated every hour, please suggest it!

### Troubleshooting

For debugging, you can use the log output of GNOME Shell.
Use this line to filter out any unrelated messages:

``` bash
journalctl -f -o cat | grep -E 'UCConverter'
```

Test the extension with this command running in a terminal.
Log messages concerning the application may then appear.

### Contributing

New contributions are always welcome!
Feel free to have a look at the code and file a PR with your ideas.

#### Contributors

[daPhipz](https://github.com/daPhipz): Better way to filter out log messages
