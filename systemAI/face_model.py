import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np


class ResNet(nn.Module):
    def __init__(self):
        super(ResNet, self).__init__()


    def forward(self):
        pass

    def flattern(self):
        pass

class Bottleneck(nn.Module):
    expansion = 4
    def __init__(self, in_channels, out_channels, i_downsample = None):
        super(Bottleneck, self).__init__()
        
        self.in_channels = in_channels
        self.out_channels = out_channels
        self.i_downsample = i_downsample

        self.conv1 = nn.Conv2d(self.in_channels, self.out_channels, kernel_size=1, stride=1, padding=0)
        self.batch_norm1 = nn.BatchNorm2d(self.out_channels)

        self.conv2 = nn.Conv2d(self.in_out_channels, self.out_channels, kernel_size=3, stride=1, padding=1 )
        self.batch_norm2 = nn.BatchNorm2d(self.out_channels)

        self.conv3 = nn.Conv2d(self.out_channels, self.out_channels * self.expansion, kernel_size=1, stride=1, padding=0)
        self.batch_norm3 = nn.BatchNorm2d(self.out_channels * self.expansion)

    def forward(self, x):
        identity = x.clone()
        x = self.conv1(x)
        x = self.batch_norm1(x)
        x = F.relu(x)

        x = self.conv2(x)
        x = self.batch_norm2(x)
        x = F.relu(x)

        x = self.conv3(x)
        x = self.batch_norm3(x)

        # downsample if neeeded
        if self.i_downsample is not None:
            identity = self.i_downsample(identity)

        # add identity
        x += identity
        x = F.relu(x)

        return x
    
class Block(nn.Modulde):
    def __init__(self, in_channels, out_channels, i_downsample = None, stride=1):
        super(Block, self).__init__()

        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, padding = 1, stride=1, bias = False)
        self.batch_norm1 = nn.BatchNorm2d(out_channels)

        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, padding = 1, stride=1, bias = False)
        self.batch_norm2 = nn.BatchNorm2d(out_channels)

        self.i_downsample = i_downsample

    def forward(self, x):
        identity = x.clone()

        x = self.conv1(x)
        x = self.batch_norm1(x)
        x = F.relu(x)

        x = self.conv2(x)
        x = self.batch_norm2(x)
        x = F.relu(x)

        if self.i_downsample is not None:
            identity = self.i_downsample(identity)
            x += identity
        
        x = F.relu(x)
        return x

        