#include <stdio.h>
#include <string.h>

// this will calculate a hash for a given string using PHP 5.3 hashtable implementation
typedef unsigned long ulong;
typedef unsigned int uint;
ulong zend_inline_hash_func(char *arKey, uint nKeyLength)
{
        ulong $h = 5381;
        char *arEnd = arKey + nKeyLength;
 
        while (arKey < arEnd) {
                $h += ($h << 5);
                $h += (ulong) *arKey++;
        }
        return $h;
}

int main (int argc, char** argv)
{
  if (argc < 2) {
    printf("Use: %s <string>\n", argv[0]);
  } else {
    printf("%lu\n", zend_inline_hash_func(argv[1], strlen(argv[1])));
  }
  return 0;
}
