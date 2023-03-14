#include <iostream>
#include <fstream>
#include <string>
using namespace std;
#define charNum 100
int main() {
    ifstream src("out.txt", ios::in);
    string str;
    int i = 1000;
    while (getline(src, str)) {
        if (str.size() > charNum) {
            string filename = "out";
            i++;
            filename += to_string(i) + ".txt";
            ofstream dst(filename, ios::out);
            dst << str;
            dst.close();
        }
    }
    src.close();
    return 0;
}